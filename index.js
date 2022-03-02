const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const graphQlSchema=require('./graphql/Schema');
const graphQResolvers=require('./graphql/resolvers');
const isAuth=require('./middleware/auth')
const cors = require('cors');


app.use(cors({
    origin: '*'
}));

app.use(bodyparser.json());

app.use(isAuth)

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQResolvers,
    graphiql: true
}))


app.get('/', (req, res, next) => {
    return res.status(200).send("Hello world")
})


mongoose.connect('mongodb://localhost:27017/demo-graphql').then(() => {
    app.listen(8000, () => {
        console.log(`listening on port 8000`)
    })
}).catch((err) => {
    console.log("error in connection !");
})

