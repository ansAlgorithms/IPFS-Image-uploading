const express = require('express')
const mongoose = require('mongoose')
const uploadRoutes = require('./Routes/upload')
const upload=require('express-fileupload');
const app = express()

app.use(upload())
//app.use('/',web)

const dotenv = require('dotenv')

dotenv.config()


// Connect to database

mongoose.connect(process.env.DB_CONNECT, () => 
console.log('connected to database!')
);

// middlewares
app.use(express.json())

app.use('/', uploadRoutes)
app.get('/upload/',(req,res)=>{
    res.sendFile(__dirname+'/Public/index.html')
})

app.listen(8080, ()=>{
    console.log('Server Up and running')
})








// save the text
/*async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(`welcome to new date`);
    console.log(result);
}*/
//saveText();

