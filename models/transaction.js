const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    userId:{ type:mongoose.Schema.Types.ObjectId,ref :"userModel"},
    amount:{ type:Number,required:true},
    type:{ type:String,required:true,enums:['CREDIT','DEBIT']},
    status: { type:String,requird:true,enums:['FAILED','SUCCESS','PROCESSING']},
    runningBalance:{ type:Number,required:true},
    transaction:{ type:mongoose.Schema.Types.ObjectId,ref:"goldTransaction"},
    createdAt:{ type:Date,required:true},
    updatedAt:{ type:Date,required:true},
})

const transactionModel = new mongoose.model("transaction",transactionSchema);

module.exports= transactionModel;