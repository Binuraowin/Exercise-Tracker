const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercise');
const usersRouter = require('./routes/user')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open',() =>{
    console.log("MongoDB database connection established succcessfully");
})

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter)

app.listen(port, () => {
    console.log(`Server is runnimg on port: ${port}`);
});