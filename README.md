# memory-cloud-server

## Requiriments:
- MongoDB (Atlas, mlab)
- Redis (redislabs)
- NodeJS host (heroku)

Set the enviroment variables: 

![capturar](https://user-images.githubusercontent.com/4512966/38452575-47ca7bcc-3a1d-11e8-9fc3-aecc3e02cd5b.JPG)


For each app is needed:

APP_ID = APP_SECRET_KEY

and

APP_ID_KEY = ENCRYPTION_KEY

The app secret key is needed to test the token(https://developers.facebook.com/docs/graph-api/reference/debug_token

The encryption key is setted in Unity3D(Memory Cloud > Edit Settings)

the SECURE is to use the RC4 encryptation.
