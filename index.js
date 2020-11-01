const express = require('express')
const app = express()
const cors  = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

//mongodb
const db = async () => {
    try {
        //mongoose= need the url where you wanna connect then config options
      const success = await mongoose.connect(process.env.MONGODB_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      console.log('MongoDb connected');
    } catch (err) {
        console.log('Connection error', err);
    }
}
//execute DB connection
db();

//middleswares
app.use(cors());

app.get('/', (req, res) => {
    res.send('hello')
})

//port ==> access .env file/variables through process.env.variable
app.listen(process.env.PORT, ()=> {
    console.log(`Server is running port : ${process.env.PORT}`);
})