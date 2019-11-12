const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;


const dbPassword = '%40dmin%219';
const mongoConnectionString = (
  `mongodb+srv://admin:${dbPassword}@cluster0-mc6pk.mongodb.net/graphQL-tutorial?retryWrites=true&w=majority`
);

mongoose.connect(
  mongoConnectionString,
  {  useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
