# Import necessary modules
import sys
import time
import nltk
from nltk.stem.lancaster import LancasterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import tensorflow as tf
import json
from textblob import TextBlob 
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
            if 'tag' in intent:
                y_docs.append(intent['tag'])
            else:
                y_docs.append('unknown')

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
        tf.keras.layers.Dense(12),
        tf.keras.layers.Dense(12),
        tf.keras.layers.Dense(len(output[0]), activation='softmax')
    ])

    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    
    try:
        model = tf.keras.models.load_model(model_filename)
    except:
        model.fit(training, output, epochs=100, batch_size=14)
        model.save(model_filename)

    return model

# Detect emotion from input using TextBlob
def detect_emotion(user_input):
    """Use sentiment analysis to detect the emotion of the user."""
    blob = TextBlob(user_input)
    polarity = blob.sentiment.polarity

    if polarity > 0.5:
        return 'excited'
    elif 0 < polarity <= 0.5:
        return 'happy'
    elif -0.5 <= polarity < 0:
        return 'sad'
    elif polarity < -0.5:
        return 'angry'
    else:
        return 'neutral'

# Load intents, preprocess, and build the model
intents_data = load_intents_data()
words, labels, training, output = preprocess_data(intents_data)
model = build_and_train_model(training, output)

# Initialize TfidfVectorizer
vectorizer = TfidfVectorizer()

# Preprocess and vectorize data during initialization
corpus = [intent['patterns'] for intent in intents_data['intents']]
X = vectorizer.fit_transform([' '.join(pattern) for pattern in corpus])
y = np.array([intent.get('tag', 'unknown') for intent in intents_data['intents']])

# Function to get a response from the chatbot
def get_response(user_input, confidence_threshold=0.50):
    # Detect emotion from user input
    emotion = detect_emotion(user_input)
    print(f"Detected emotion: {emotion}")

    # Use TF-IDF and cosine similarity to map user input to chatbot intents
    user_vector = vectorizer.transform([user_input])
    similarity_scores = cosine_similarity(user_vector, X)
    max_similarity_index = np.argmax(similarity_scores)
    max_similarity = similarity_scores[0, max_similarity_index]

    if max_similarity < confidence_threshold:
        return ["I'm sorry, I don't have a response for that."]

    tag = y[max_similarity_index]
    responses = []

    for intent in intents_data['intents']:
        if 'tag' in intent and intent['tag'] == tag and emotion in intent.get('context', []):
            responses.extend(intent['responses'])

    if responses:
        return [responses[0]]
    else:
        return ["I'm sorry, I don't have a response for that."]

# Flask API route for chatbot
@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_input = request.json.get('message')
    responses = get_response(user_input)
    return jsonify({"response": responses})

# Start the Flask server
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
