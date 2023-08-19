const express = require("express");
const { credit, debit } = require("../controllers/transaction");
const { auth } = require("../middlewares/userAuth");


const transaction= express.Router();

transaction.post("/credit",auth,credit)

transaction.post("/debit",auth,debit)

module.exports= transaction;