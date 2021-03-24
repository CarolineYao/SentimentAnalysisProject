from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import nlp
import numpy as np

index_to_class = {0: 'anger', 1: 'fear', 2: 'love', 3: 'sadness', 4: 'joy', 5: 'surprise'}

def get_text_and_label(data):
    texts = [x['text'] for x in data]
    labels = [x['label'] for x in data]

    return np.array(texts), np.array(labels)

def create_model():
    # Create model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Embedding(10000, 16, input_length=maxlen),
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

def get_sequences(texts, maxlen=50):
    dataset = nlp.load_dataset('emotion')

    train = dataset['train']
    validation = dataset['validation']
    test = dataset['test']

    train_texts, train_labels = get_text_and_label(train)

    tokenizer = Tokenizer(num_words=10000, oov_token='<UNNK>')
    tokenizer.fit_on_texts(train_texts)
    sequences = tokenizer.texts_to_sequences(texts)
    padded = pad_sequences(sequences, truncating='post', padding='post', maxlen=maxlen)

    return np.array(padded)
 