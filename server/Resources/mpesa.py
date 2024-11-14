# import os
# import requests
# from dotenv import load_dotenv
# from requests.auth import HTTPBasicAuth#this class from requests is used to create HTTP Basic Authentication headers. it is used for mananging senstive data like API keys securely
# from flask import Flask, jsonify
# from flask_restful import Api, Resource


# #create the flask web application instance
# app = Flask(__name__)


# #loads envirooment variables from .env file into the python enviroment
# load_dotenv()

# #MPESA CONSUMER KEY stores the consumer key for the Mpesa API Authentication
# CONSUMER_KEY = os.getenv("MPESA_CONSUMER_KEY")
# CONSUMER_SECRET = os.getenv('MPESA_CONSUMER_SECRET')
# BASE_URL = os.getenv('MPESA_BASE_URL')


# #get access_token retrieves the access token from the mpesa api using OAuth2 client credentials flow
# def get_access_token():
#     #url to the mpesa api endpoint that generates an access token 
#     auth_url = f"{BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
#     response = requests.get(auth_url, auth=HTTPBasicAuth(CONSUMER_KEY, CONSUMER_SECRET))
    
#     if response.status_code == 200:
#         access_token = response.json().get('access_token')
#         return access_token
#     else:
#         return None
    
# class MpesaTokenResouce(Resource):
#     def get(self):
#         access_token = get_access_token()
#         if access_token:
#             return {"access_token": access_token}, 200
#         else:
#             return {"error": "Failed to obtain the access token"}, 500
        
# if __name__ == "__main__":
#     app.run(debug=True)