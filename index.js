require('dotenv').config();
const express = require("express");
const app = express();
const cors= require('cors') ;
const bodyParser = require("body-parser");
const mongoose = require('mongoose');


const httpStatusText =require('./utils/http-status-handler');
const url= process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log("connect to mongo is success");
});

app.use(cors());
app.use(bodyParser.json());

const productRouter= require('./routs/products-route');
const usersRouter= require('./routs/users.route');

app.use('/api/products',productRouter);
app.use('/api/users',usersRouter)

//global middelware for not found router
app.all('*',(req ,res,next)=>{
        return res.status(404).json({status:httpStatus.ERROR,message: 'this resourse is not avaliable '});

}) 

//global error handeler
app.use((req,res,next) =>{
    res.status(error.statusCode||500).json({status :error.statusText||httpStatusText.ERROR,message: error.message,code: error.statusCode || 500,data : null});
})

app.listen(7000, () => {
    console.log(`Listening on port 7000`);
});
