// @ts-nocheck
const path = require('path');
const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');


const app = express();

// Connect to database
connectDB();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'production'
  })
);

// Graphql deployment
app.use(express.static('public'));

app.get('*', (req, res) => {
  // public folder is used for static files after run build, change name and move out of client folder
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



//! REST API deployment
// __dirname = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//   // server path join to public folder for deployment
//   app.use(express.static(path.join(__dirname, 'public')));

//   app.get('*', (req, res) => {
//     // public folder is used for static files after run build, change name and move out of client folder
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('Server is running');
//   });
// }



const port = process.env.PORT || 4000;
app.listen(port, console.log(`Server running on port ${port}`));
