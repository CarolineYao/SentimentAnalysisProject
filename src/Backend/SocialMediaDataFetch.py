import os
from tweepy import OAuthHandler, API, TweepError
from Models import Data
from abc import ABC, abstractmethod
import datetime

class SocialMediaDataFetch(ABC):
    
    _start_date = datetime.datetime.now() - datetime.timedelta(days=7)
    _end_date = datetime.datetime.now()
    _data_lst = []

    def __init__(self, start_date, end_date):
        assert(start_date < end_date)
        self._start_date = start_date
        self._end_date = end_date
        self._data_lst = []
    
    @abstractmethod
    def __get_api_access__(self):
        pass

    @abstractmethod
    def __format_data__(self, data):
        pass

    @abstractmethod
    def __filter_data_by_time__(self, data):
        pass

    @abstractmethod 
    def fetch_user_posts(self, user_id):
        pass
    
    def get_data_lst(self):
        return self._data_lst
    
    

class TwitterDataFetch(SocialMediaDataFetch):
    _api = None
    
    def __init__(self, start_date = datetime.datetime.now() - datetime.timedelta(days=7), end_date = datetime.datetime.now()):
        assert(start_date < end_date)
        super().__init__(start_date, end_date)
        print(id(self._data_lst))
    
    
    def __get_user_timeline__(self, user_id, last_id = -1):
        if last_id == -1:
            new_tweets = self._api.user_timeline(screen_name=user_id, count=200, include_rts = False, tweet_mode = 'extended')
        else: 
            new_tweets = self._api.user_timeline(screen_name=user_id, count=200, include_rts = False, max_id = str(last_id - 1), tweet_mode = 'extended')
        
        return new_tweets


    def __get_api_access__(self):  
        # TODO: move to env file once setup
        consumer_key = "Ghsx0hbmNz5UKMrLaJX8Whlmv"
        consumer_secret = "gBwqcEvRjJ4BVtvV3knQHgxnEXNzkikndtJsRpYkcz7rQ7eXkV"
        access_token = "976956847138791424-oWw9Q00D5zMRpCMwcjiwUiFb7BelZb9"
        access_token_secret = "iCDUsytTIjtpPtg3QopBmJifKIiw0Srbc06ROiOp0ZupF"

        auth = OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        self._api = API(auth)

    def __format_data__(self, searched_tweets):
        for tweet in searched_tweets:
            new_data = Data(tweet.full_text, tweet.created_at)
            self._data_lst.append(new_data)
            
            
    
    def __filter_data_by_time__(self, tweets):
        # tweets are sorted by time from the latest to the earliest
        if (self._start_date > tweets[0].created_at):
            # means the latest tweet is earlier than the start date, search finished
            return False
        if (self._end_date < tweets[-1].created_at):
            # means the earliest tweet is later than the end date, need to keep extracting
            return True
        
        earliest = len(tweets)
        latest = 0
        
        if (self._start_date > tweets[-1].created_at):
            earliest = self.__binary_search_get_time_index(tweets, self._start_date)
        
        if (self._end_date < tweets[0].created_at):
            latest = self.__binary_search_get_time_index(tweets[:earliest], self._end_date) - 1
            assert(latest >= 0) #prevent bug
        self.__format_data__(tweets[latest: earliest])
                
        return earliest != len(tweets)


    def __binary_search_get_time_index(self, tweets, time):
        start_point = len(tweets)
        end_point = 0
        pivot = (start_point + end_point)//2
        while (start_point - end_point > 1):
            if (time > tweets[pivot].created_at):
                start_point = pivot
            else:
                end_point = pivot
            pivot = (start_point + end_point)//2
        return start_point
            
    

    def fetch_user_posts(self, user_id):
        self._data_lst = []
        self.__get_api_access__()
        last_id = -1
        keep_requesting = True
        
        while (keep_requesting):
            try:
                new_tweets = self.__get_user_timeline__(user_id, last_id)
                if not new_tweets:
                    break
                last_id = new_tweets[-1].id
                keep_requesting = self.__filter_data_by_time__(new_tweets)
                

            except TweepError as e:
                print(e)
                break


dataFetch7 = TwitterDataFetch(start_date = datetime.datetime.now() - datetime.timedelta(days=1))
dataFetch7.fetch_user_posts("brecrossings")
lst_7 = dataFetch7.get_data_lst()

print(len(lst_7))

dataFetch8 = TwitterDataFetch(start_date = datetime.datetime.now() - datetime.timedelta(days=2))
dataFetch8.fetch_user_posts("brecrossings")
lst_8 = dataFetch8.get_data_lst()

print(len(lst_8))


dataFetch7.fetch_user_posts("brecrossings")
lst_7 = dataFetch7.get_data_lst()

print(len(lst_7))