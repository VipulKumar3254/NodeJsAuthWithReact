const mongoose = require('mongoose');

 mongoose.connect("mongodb://127.0.0.1:27017/auth").then( ()=>{

    console.log("connected to db");
}).catch( (e)=>{
    console.log("can't connect to db ");
    // console.log(e);
});

module.exports= mongoose;