import sys
import time
import nltk
from nltk.stem.lancaster import LancasterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import tensorflow as tf
import json
from flask import Flask, request, jsonify

nltk.download("punkt")

# Initialize Flask app
app = Flask(__name__)

# Function to load intents data
def load_intents_data(filename='backend/ai/intents.json'):
    with open(filename, 'r', encoding='utf-8') as intents_file:
        return json.load(intents_file)

# Function to preprocess data
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
    words = sorted(list(set(words)))
    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(x_docs):
        bag = []
        wrds = [stemmer.stem(w) for w in doc]
        for w in words:
            if w in wrds:
                bag.append(1)
            else:
                bag.append(0)

        output_row = out_empty[:]
        output_row[labels.index(y_docs[x])] = 1

        training.append(bag)
        output.append(output_row)

    return words, labels, np.array(training), np.array(output)

# Build and train the model
def build_and_train_model(training, output, model_filename='model.h5'):
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(len(training[0]),)),
        tf.keras.layers.Dense(128),
        tf.keras.layers.Dense(128),
        tf.keras.layers.Dense(128),
        tf.keras.layers.Dense(128),
        tf.keras.layers.Dense(len(output[0]), activation='softmax')
    ])

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # Print the number of neurons in the input and output layers
    num_input_neurons = len(training[0])
    num_output_neurons = len(output[0])

    print(f"Number of neurons in the input layer: {num_input_neurons}")
    print(f"Number of neurons in the output layer: {num_output_neurons}")

    try:
        model = tf.keras.models.load_model(model_filename)
    except:
        model.fit(training, output, epochs=100, batch_size=14)
        model.save(model_filename)

    # Display a summary of the model architecture, including the number of parameters
    model.summary()

    # Access the details of each layer
    for layer in model.layers:
        print(layer.name, layer.trainable)
        if hasattr(layer, 'weights'):
            print([w.shape for w in layer.weights])

    return model

# Load intents data, preprocess, and build the model
intents_data = load_intents_data()
words, labels, training, output = preprocess_data(intents_data)
model = build_and_train_model(training, output)

# Initialize TfidfVectorizer
vectorizer = TfidfVectorizer()

# Preprocess and vectorize data during initialization
corpus = []
for intent in intents_data['intents']:
    for pattern in intent['patterns']:
        corpus.append(pattern)
X = vectorizer.fit_transform(corpus)
y = np.array([intent.get('tag', 'unknown') for intent in intents_data['intents'] for _ in intent['patterns']])

# Function to get a response from the chatbot
def get_response(user_input, confidence_threshold=0.50):
    user_vector = vectorizer.transform([user_input])

    # Calculate cosine similarity between user input and patterns
    similarity_scores = cosine_similarity(user_vector, X)

    # Find the intent with the highest similarity score
    max_similarity_index = np.argmax(similarity_scores)
    max_similarity = similarity_scores[0, max_similarity_index]

    if max_similarity < confidence_threshold:
        return ["I'm sorry, but I don't have a response for that question."]

    tag = y[max_similarity_index]

    responses = []
    for intent in intents_data['intents']:
        if 'tag' in intent and intent['tag'] == tag:
            if 'responses' in intent:  # Check if 'responses' exists in the intent
                responses.extend(intent['responses'])

    if responses:
        return [responses[0]]  # Return only the first response
    else:
        return ["I'm sorry, but I don't have a response for that question. "]

# Flask API route for chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot_route():
    user_input = request.json.get('message')
    responses = get_response(user_input)
    return jsonify({"response": responses})

# Start the Flask server
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)

