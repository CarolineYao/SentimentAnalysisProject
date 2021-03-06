import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import nlp
import numpy as np
import pickle

index_to_class = {0: 'anger', 1: 'fear', 2: 'love', 3: 'sadness', 4: 'joy', 5: 'surprise'}

def get_text_and_label(data):
    texts = [x['text'] for x in data]
    labels = [x['label'] for x in data]

    return np.array(texts), np.array(labels)

def create_model():
    # Create model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Embedding(10000, 16, input_length=50),
        tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20, return_sequences=True)),
        tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(20)),
        tf.keras.layers.Dense(6, activation='softmax'),
    ])

    model.compile(
        loss='sparse_categorical_crossentropy',
        optimizer='adam',
        metrics=['accuracy']
    )

    return model

def get_sequences(texts, backend_folder_path='.'):
    # loading
    with open(backend_folder_path + '/NeuralNetModelContent/weights/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    sequences = tokenizer.texts_to_sequences(texts)
    padded = pad_sequences(sequences, truncating='post', padding='post')

    return np.array(padded)
 