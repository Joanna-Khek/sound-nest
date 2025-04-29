from django.shortcuts import render
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView, # verify that access token is still valid
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    By default, JWT tokens are returned in the response body, and you have to store them manually in localStorage or something similar on the frontend
    """
    def post(self, request, *args, **kwargs):
        """
        Custom view to handle token generation.
        This is where we can add custom logic for generating tokens.
        
        Store JWT tokens (access & refresh) in secure cookies instead of just returning them in the JSON response.
        
        max_age: how long the token should be valid
        secure: only send cookies over HTTPS
        httponly: JavaScript can't access the cookie (prevents XSS)
        samesite: cross-site request protection
        path: cookie scope
        
        """
        # Call the parent class's post method to handle token generation
        response = super().post(request, *args, **kwargs)
        
        # Check login is successful
        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )
            
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Tries to get refresh token from the request cookies
        refresh_token = request.COOKIES.get('refresh')
        
        print(f"Refresh token from cookie: {refresh_token}")
        print(f"Request data before: {request.data}")
        
        
        # If cookie exists, inject refresh token into request body
        if refresh_token:
            request.data['refresh'] = refresh_token
        print(f"Request data after: {request.data}")
        
        response = super().post(request, *args, **kwargs)
        
        print(f"Refresh response: {response.status_code}, {response.data}")
        
        # If refresh worked, grab new access token from the response
        # and store new access token in the response cookies
        if response.status_code == 200:
            access_token = response.data.get('access')
            
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE,
            )
            
        return response
    
class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        """
        Send this request to the token verify view in the request
        and get the response back. This is to check if the 
        access token is verified
        """
        access_token = request.COOKIES.get('access')
        
        if access_token:
            request.data['token'] = access_token
        
        return super().post(request, *args, **kwargs)
    
class LogoutView(APIView):
    """
    Deleting the JWT cookies (access and refresh).
    """
    def post(self, request, *args, **kwargs):
        # Creates an empty response with HTTP status 204 No Content
        response = Response(status=status.HTTP_204_NO_CONTENT)
        
        # Deletes access and refresh cookies
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        
        return response
    