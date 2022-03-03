// const express = require('express');
// const app = express();
// const bodyparser = require('body-parser');
// const { graphqlHTTP } = require('express-graphql');
// const mon = require('mongoose');
// const graphQlSchema=require('./graphql/Schema');
// const graphQResolvers=require('./graphql/resolvers');
// const isAuth=require('./middleware/auth')
// const cors = require('cors');
import express from 'express';
const app= express();
import { json } from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import graphQlSchema from './graphql/Schema';
import * as graphQlResolvers from './graphql/resolvers';
import isAuth from './middleware/auth'
import cors from 'cors';

// const allowedOrigins = "*";

const options: cors.CorsOptions = {
  origin: "*"
};

app.use(cors(options));

app.use(json());
app.use(isAuth)

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))


app.get('/', (req, res, next) => {
    return res.status(200).send("Hello world")
})


mongoose.connect('mongodb://localhost:27017/demo-graphql').then(() => {
    console.log("connected to database")
}).catch((err:Error):any => {
    
    console.log("error in connection !");
    throw err;
})

app.listen(8000, () => {
    console.log(`listening on port 8000`)
})
