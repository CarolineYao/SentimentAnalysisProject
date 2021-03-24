import os
from tweepy import OAuthHandler, API, TweepError
from Models import Data
from abc import ABC, abstractmethod

class SocialMediaDataFetchInterface(ABC):
    @abstractmethod
    def __get_api_access__(self):
        pass

    @abstractmethod
    def __format_data__(self, data):
        pass

    @abstractmethod 
    def fetch_user_posts(self, user_identifier, max_request_count):
        pass

class TwitterDataFetch(SocialMediaDataFetchInterface):
    __api = None
    data_lst = []
    
    def __get_user_timeline__(self, name, last_id = -1):
        if last_id == -1:
            new_tweets = self.__api.user_timeline(screen_name=name, count=200, include_rts = False, tweet_mode = 'extended')
        else: 
            new_tweets = self.__api.user_timeline(screen_name=name, count=200, include_rts = False, max_id = str(last_id - 1), tweet_mode = 'extended')
        
        return new_tweets


    def __get_api_access__(self):  
        # TODO: move to env file once setup
        consumer_key = "Ghsx0hbmNz5UKMrLaJX8Whlmv"
        consumer_secret = "gBwqcEvRjJ4BVtvV3knQHgxnEXNzkikndtJsRpYkcz7rQ7eXkV"
        access_token = "976956847138791424-oWw9Q00D5zMRpCMwcjiwUiFb7BelZb9"
        access_token_secret = "iCDUsytTIjtpPtg3QopBmJifKIiw0Srbc06ROiOp0ZupF"

        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        self.__api = API(auth)

    def __format_data__(self, searched_tweets):
        for tweet in searched_tweets:
            new_data = Data(tweet.full_text, tweet.created_at)
            self.data_lst.append(new_data)

    def fetch_user_posts(self, user_identifier, max_request_count = 10):
        self.__get_api_access__()
        searched_tweets = []
        request_count = 0
        last_id = -1

        for request_count in range(max_request_count):
            try:
                new_tweets = self.__get_user_timeline__(user_identifier, last_id)

                if not new_tweets:
                    break

                searched_tweets.extend(new_tweets)
                last_id = new_tweets[-1].id
                request_count += 1

            except TweepError as e:
                print(e)
                break
        
        self.__format_data__(searched_tweets)

        return self.data_lst