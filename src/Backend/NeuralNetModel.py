from Models import Model, Data
from NeuralNetModelContent.model_utils import create_model, index_to_class, get_sequences
import nlp
import datetime
import numpy as np

class NeuralNetModel(Model): 
    _model = None

    def __init__(self):
        super().__init__()
        self.get_model("NeuralNetModel")
        

    def __pre_process_text(self, text):
        # TODO: do pre processing
        return text

    def analyze(self, data):
        assert(isinstance(data,(Data, str)))
        text = np.array([self.__pre_process_text(data.get_text())])
        text = get_sequences(text)
        prediction = self._model.predict(text)[0]

        return index_to_class.get(prediction.argmax())
    
    ## static method for choosing the model
    def get_model(self, model_Name):
        self._model = create_model()
        checkpoint_path = "./NeuralNetModelContent/weights/cp.ckpt"
        self._model.load_weights(checkpoint_path)
    
    def login():
        raise Error("Invalid function")
    
    def add_external_login_info(self, ser_info):
        raise Error("Invalid function")


if __name__ == '__main__':
    nn_model = NeuralNetModel()
    text = "im updating my blog because i feel shitty"
    data = Data(text)
    result = nn_model.analyze(data)
    print(result)