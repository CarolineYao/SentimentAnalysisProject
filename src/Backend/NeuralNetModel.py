from Models import Model
from model_utils import create_model, index_to_class
import nlp

class NeuralNetModel(Model): 
    def __pre_process_text(self, text):
        # TODO: do pre processing
        return text

    def analyze(self, data):
        assert(isinstance(data,(Data, str)))
        text = np.array([__pre_process_text(data.get_text)])
        text = get_sequences(text)
        prediction = model.predict(text)[0]

        return index_to_class.get(prediction.argmax())
    
    ## static method for choosing the model
    def get_model(model_Name):
        model = create_model()
        checkpoint_path = "./NeuralNetModel/weights/cp.ckpt"
        model.load_weights(checkpoint_path)
    
    def login():
        raise Error("Invalid function")
    
    def add_external_login_info(self, ser_info):
        raise Error("Invalid function")
