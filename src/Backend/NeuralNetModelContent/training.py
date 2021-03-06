import tensorflow as tf
import numpy as np
import nlp
import random
import os
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle

from model_utils import create_model, index_to_class

def get_text_and_label(data):
    texts = [x['text'] for x in data]
    labels = [x['label'] for x in data]

    return np.array(texts), np.array(labels)

def get_sequences(tokenizer, texts):
    sequences = tokenizer.texts_to_sequences(texts)
    padded = pad_sequences(sequences, truncating='post', padding='post')

    return np.array(padded)

def get_x_y_data(data, label_to_id):
    texts, labels = get_text_and_label(data)
    seq = get_sequences(tokenizer, texts)
    labels_id = np.array([label_to_id.get(x) for x in labels])

    return seq, labels_id


if __name__ == '__main__':
    # Load trainning dataset
    dataset = nlp.load_dataset('emotion')
    # Preping datasets
    train_data = dataset['train']
    validation_data = dataset['validation']
    test_data = dataset['test']

    train_texts, train_labels = get_text_and_label(train_data)

    tokenizer = Tokenizer(num_words=10000, oov_token='<UNNK>')
    tokenizer.fit_on_texts(train_texts)
    with open('./weights/tokenizer.pickle', 'wb') as handle:
        pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

    class_to_index = dict((c, i) for i, c in index_to_class.items())
    print(index_to_class)
    print(class_to_index)

    train_seq, train_labels_id = get_x_y_data(train_data, class_to_index)
    validation_seq, validation_labels_id = get_x_y_data(validation_data, class_to_index)
    test_seq, test_labels_id = get_x_y_data(test_data, class_to_index)

    # Create model
    model = create_model()

    # Create checkpoints to store the weights
    checkpoint_path = "./weights/cp.ckpt"
    checkpoint_dir = os.path.dirname(checkpoint_path)

    cp_callback = tf.keras.callbacks.ModelCheckpoint(filepath=checkpoint_path,
                                                    save_weights_only=True,
                                                    verbose=1)

    model.fit(
        train_seq,
        train_labels_id,
        validation_data=(validation_seq, validation_labels_id),
        epochs = 10,
        callbacks=[
                tf.keras.callbacks.EarlyStopping(monitor='val_accuracy', patience=2),
                cp_callback
        ]
    )

    model.evaluate(test_seq, test_labels_id)
