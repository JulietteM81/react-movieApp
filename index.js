const express = require('express')
const app = express()
const cors  = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')
const { User } = require('./models/user')

require('dotenv').config();

//mongodb
const db = async () => {
    try {
        //mongoose= need the url where you wanna connect then config options
      const success = await mongoose.connect(config.mongoURI, {
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
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Hello you ')
})

app.post('/api/users/register', (req, res) => {
    //after reading that request ==> need to send info in mongodb 
    const user = new User(req.body)
    user.save((err, userData) => {
        if(err) return res.json({ success: false, err})
        //if we don't have any errors
        return res.status(200).json({ success : true })
    })
})

//port ==> access .env file/variables through process.env.variable
app.listen(config.PORT, ()=> {
    console.log(`Server is running port : ${process.env.PORT}`);
})