const express = require('express');
const connectDB = require('./src/database/db');
const router = require('./src/route/user')
const cors=require('cors');

require('dotenv').config({path: './src/dotenv/.env'});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",router);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })

PORT = process.env.PORT

app.listen(PORT, async() => {
    try{
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    }catch(err){
        console.log("Error in index.js listen")
        console.log(err);
    }
})