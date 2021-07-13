
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const mongoose = require('mongoose');

import route from './Routes/textRoutes.js';


const app = express();
const port = process.env.PORT||6000;

let corsOptions = {
  origin: '*'
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api',route);
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/textMeaningDB';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
mongoose.connect(mongoUri, options);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(port, () => {
    console.log('App started on ', port);
});