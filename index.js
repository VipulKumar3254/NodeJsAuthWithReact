const express = require("express");
const { json } = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { signup, login } = require("./controllers/userAuth");
const { auth } = require("./middlewares/userAuth");
const transaction = require("./routes/transaction");
const cors = require("cors")


require("./config/db")

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded( {extended:true}))


app.use( "/transaction",transaction);



app.get("/",(req,res)=>{
    res.send("server is live")
})


// app.post("/login",(req,res)=>{
//     console.log("hi");
// })
app.post("/login",login)
app.post("/signup",signup)
app.get("/login",auth,(req,res)=>{
    res.status(200).json({valid:true})
})
// app.post("/login",login)

app.listen(process.env.PORT,()=>console.log(`server is listenin on port ${process.env.PORT}`));