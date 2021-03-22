# -*- coding: utf-8 -*-
"""
Created on Sun Mar 21 21:20:10 2021

@author: sunt9
"""

import datetime

class Data:
    __text = ""
    __time = None
    ## picture form to be defined
    __picture_list = []
    
    def __init__(self, text = "", time = datetime.datetime.now()):
        __text = text
        __time = time
        
    def add_pic():
        pass

class external_API_login:
    __user_info = None
    
    def __init__(self, user_info):
        __user_info = user_info

    def get_user_info():
        return __user_info


class Model:         
    
    __external_API_login = None
    
    def analyze(self, data):
        assert(isinstance(data,(Data, str)))
        pass
    
    ## static method for choosing the model
    def get_model(model_Name):
        pass
    
    def login():
        pass
    
    def add_external_login_info(user_info):
        __external_API_login = user_info
