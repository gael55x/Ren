import sys
import time
import nltk
from nltk.stem.lancaster import LancasterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import tensorflow as tf
from tensorflow.keras.callbacks import Callback
import json
from flask import Flask, request, jsonify

nltk.download("punkt")

app = Flask(__name__)

# Callback to Stop Training at Desired Accuracy
class StopTrainingAtAccuracy(Callback):
    def __init__(self, accuracy_threshold):
        super(StopTrainingAtAccuracy, self).__init__()
        self.accuracy_threshold = accuracy_threshold
        self.best_accuracy = 0.0

    def on_epoch_end(self, epoch, logs=None):
        accuracy = logs.get('accuracy')
        if accuracy is None:
            accuracy = logs.get('acc')
        if accuracy is None:
            accuracy = logs.get('categorical_accuracy')

        if accuracy is not None:
            if accuracy > self.best_accuracy:
                self.best_accuracy = accuracy

            if self.best_accuracy >= self.accuracy_threshold:
                print(f"\nReached {self.accuracy_threshold*100}% accuracy, stopping training.")
                self.model.stop_training = True


def load_intents_data(filename='intents.json'):
    with open(filename, 'r', encoding='utf-8') as intents_file:
        return json.load(intents_file)

def preprocess_data(data):
    stemmer = LancasterStemmer()
    words = []
    labels = []
    x_docs = []
    y_docs = []

    for intent in data['intents']:
        for pattern in intent['patterns']:
            wrds = nltk.word_tokenize(pattern)
            words.extend(wrds)
            x_docs.append(wrds)
            y_docs.append(intent.get('tag', 'unknown'))

        if 'tag' in intent and intent['tag'] not in labels:
            labels.append(intent['tag'])

    words = [stemmer.stem(w.lower()) for w in words if w not in "?"]
    words = sorted(set(words))
    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(x_docs):
        bag = []
        wrds = [stemmer.stem(w) for w in doc]
        for w in words:
            bag.append(1 if w in wrds else 0)

        output_row = out_empty[:]
        output_row[labels.index(y_docs[x])] = 1

        training.append(bag)
        output.append(output_row)

    return words, labels, np.array(training), np.array(output)

def build_and_train_model(training, output, model_filename='model.h5'):
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(len(training[0]),)),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(64, activation='relu'),
        tf.keras.layers.Dense(len(output[0]), activation='softmax')
    ])

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    num_input_neurons = len(training[0])
    num_output_neurons = len(output[0])

    print(f"Number of neurons in the input layer: {num_input_neurons}")
    print(f"Number of neurons in the output layer: {num_output_neurons}")

    try:
        model = tf.keras.models.load_model(model_filename)
        print("Model loaded from disk.")
    except:
        print("Training a new model.")
        accuracy_callback = StopTrainingAtAccuracy(accuracy_threshold=0.90)
        
        model.fit(
            training,
            output,
            epochs=100,
            batch_size=14,
            callbacks=[accuracy_callback]
        )
        model.save(model_filename)
        print("Model saved to disk.")

    model.summary()

    for layer in model.layers:
        print(layer.name, layer.trainable)
        if hasattr(layer, 'weights'):
            print([w.shape for w in layer.weights])

    return model

intents_data = load_intents_data()
words, labels, training, output = preprocess_data(intents_data)
model = build_and_train_model(training, output)

# Initialize TfidfVectorizer
vectorizer = TfidfVectorizer()

corpus = []
for intent in intents_data['intents']:
    for pattern in intent['patterns']:
        corpus.append(pattern)
X = vectorizer.fit_transform(corpus)
y = np.array([
    intent.get('tag', 'unknown')
    for intent in intents_data['intents']
    for _ in intent['patterns']
])

def get_response(user_input, confidence_threshold=0.50):
    user_vector = vectorizer.transform([user_input])

    similarity_scores = cosine_similarity(user_vector, X)

    max_similarity_index = np.argmax(similarity_scores)
    max_similarity = similarity_scores[0, max_similarity_index]

    if max_similarity < confidence_threshold:
        return ["I'm sorry, but I don't have a response for that question."]

    tag = y[max_similarity_index]

    responses = []
    for intent in intents_data['intents']:
        if 'tag' in intent and intent['tag'] == tag:
            if 'responses' in intent: 
                responses.extend(intent['responses'])
            break

    if responses:
        return [responses[0]]  
    else:
        return ["I'm sorry, but I don't have a response for that question."]

# Flask API route for chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot_route():
    user_input = request.json.get('message')
    responses = get_response(user_input)
    return jsonify({"response": responses})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
