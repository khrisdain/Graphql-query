const express = require('express');
require('dotenv').config();
const colors = require('colors');
const cors = require('cors')
const schema = require('./schema/schema')
//express-graphql library 
const {graphqlHTTP} = require('express-graphql');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;
const app = express();

//connect database
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development' //use graphiql at development alone 
}));


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});