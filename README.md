# apollo-tutorial-kit (formerly apollo-starter-kit)

Starting point for GraphQL Server with subscriptions, using:

- [BabelJS](https://babeljs.io/docs/plugins/preset-env/)
- [ESlint](https://github.com/standard/eslint-config-standard)
- [Nodemon](https://github.com/remy/nodemon)
- [MongooseJS](http://mongoosejs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

See also [Tutorial: How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.wy5h1htxs) and the solution in the `server-tutorial-solution` branch of this repo.

Up-to-date documentation and explanations for Apollo Server can be found on [docs.apollostack.com](http://dev.apollodata.com/tools/apollo-server/index.html)

Explanations for [schemaglue](https://github.com/nicolasdao/schemaglue) and [graphql-s2s](https://github.com/nicolasdao/graphql-s2s) on [hackernoon.com](https://hackernoon.com/graphql-schemas-easier-better-structure-31677a640d18)

Explanations for [graphql-subscriptions](https://github.com/apollographql/graphql-subscriptions) and [subscriptions-transport-ws](https://github.com/apollographql/subscriptions-transport-ws) on [scotch.io](https://scotch.io/bar-talk/creating-graphql-subscriptions-in-express)

## Getting started

Run mongodb

```sh
git clone https://github.com/rafaelnsantos/graphql-server
cd apollo-starter-kit
npm install
npm start
```

Then open [http://localhost:3000/graphiql](http://localhost:3000/graphql)

When you paste this on the left side of the page:

```
mutation {
  createUser (credentials: {
    email: "a@a.com"
    password: "a"
  }){
    email
  }
}
```

and hit the play button (cmd-return), then you should get this on the right side:

```json
{
  "data": {
    "email": "a@a.com"
  }
}
```  

then you can:

```
query {
  login (credentials: {
    email: "a@a.com"
    password: "a"
  })
}
```

responds a jsonwebtoken:

```
{
  "data": {
    "login": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNWEwYmNhZDUwMDQwNDE0NDcwYTRmN2E0Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImVtYWlsIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJwYXRoc1RvU2NvcGVzIjp7fSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6dHJ1ZX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsInBhc3N3b3JkIjoiJDJhJDEwJENqNlpjRTV2T0o0TjN6YWxmWHdDUHVDWTNoMlVITlpFczZIaUhmcmdNVFRkT1Z2UHdEejg2IiwiZW1haWwiOiJhQGEuY29tIiwiX2lkIjoiNWEwYmNhZDUwMDQwNDE0NDcwYTRmN2E0In0sIiRpbml0Ijp0cnVlLCJpYXQiOjE1MTA3MjM5MDZ9.KNtRGRWAF6aWTOl48vXvrKVB4zVUyHMhW7uG5bDUYu8"
  }
}
```

insert the token on the header : token([test with graphiql-app](https://github.com/skevy/graphiql-app)):

```
query {
  me {
    id
    email
  }
}

mutation {
  changePassword (
    oldPassword: "a"
    newPassword: "b"
  )
}
```
