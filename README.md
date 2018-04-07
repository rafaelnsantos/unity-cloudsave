# memory-cloud-server

## Requiriments:
- MongoDB (Atlas, mlab)
- Redis (redislabs)
- NodeJS host (heroku)

Set the enviroment variables: 

![capturar](https://user-images.githubusercontent.com/4512966/38453267-21b3e516-3a29-11e8-94ad-59f46c40cacf.JPG)

For each app is needed:

APP_ID = APP_SECRET_KEY

and

APP_ID_KEY = ENCRYPTION_KEY

The app secret key is needed to test the token(https://developers.facebook.com/docs/graph-api/reference/debug_token

The encryption key is setted in Unity3D(Memory Cloud > Edit Settings)

the SECURE is to use the RC4 encryptation.
