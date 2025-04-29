from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CustomJWTAuthentication(JWTAuthentication):
    """
    Custom JWT Authentication class that overrides the default behavior.
    When we make an authorise request, we send the token in the header.
    """
    def authenticate(self, request):
        try:
            header = self.get_header(request)
            if header is None:
                # grab access token from cookie
                raw_token = request.COOKIES.get(settings.AUTH_COOKIE)
            else:
                raw_token = self.get_raw_token(header)

            if raw_token is None:
                return None

            validated_token = self.get_validated_token(raw_token)
            
            return self.get_user(validated_token), validated_token
        
        except: 
            return None

            