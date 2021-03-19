from model_utils import create_model
import nlp

# Load trainning dataset
dataset = nlp.load_dataset('emotion')
# Preping datasets
test_data = dataset['test']

model = create_model()
loss, acc = model.evaluate(test_seq, test_labels_id)
print("Untrained model, accuracy: {:5.2f}%".format(100 * acc))


checkpoint_path = "./weights/cp.ckpt"
# Loads the weights
model.load_weights(checkpoint_path)

# Re-evaluate the model
loss, acc = model.evaluate(test_seq, test_labels_id)
print("Restored model, accuracy: {:5.2f}%".format(100 * acc))