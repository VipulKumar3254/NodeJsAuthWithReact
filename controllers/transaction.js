const transactionModel = require("../models/transaction");
const { userModel } = require("../models/userModel");



const credit= async(req,res)=>{
    const userId = req.userId;
    let {amount}=req.body;
    console.log(amount);
    amount = parseInt(amount)
    console.log(typeof(amount));
    console.log(userId);


    const userData =await  userModel.findOne({ _id:userId})



    const data = await transactionModel.create({
        userId:userId,
        amount:amount,
        type:"CREDIT",
        status:"SUCCESS",
        runningBalance:userData.runningBalance.wallet+amount,
        createdAt: Date.now(),
        updatedAt: Date.now()

    })

    updatedBalance = userData.runningBalance.wallet+amount;

    const updatedUserData = await userModel.findByIdAndUpdate({_id:userId},{$set:{ "runningBalance.wallet":updatedBalance }},{new:true})
    console.log(updatedUserData);

    res.status(200).json({ message:"transaction record has been recorded"})


}




const debit =async  (req,res)=>{
    const userId = req.userId;
    console.log(userId);
    let  amount = req.body.amount;
    amount  = parseInt(amount);
    console.log(req.body);
    const userData =await  userModel.findOne({ _id:userId})
    console.log(userData);

    if(userData.runningBalance.wallet-amount < 0)
    {
        return res.status(400).json({message:"balance is low "})
    }
    
    const data = await transactionModel.create({
        userId:userId,
        amount:amount,
        type:"DEBIT",
        status:"SUCCESS",
        runningBalance:userData.runningBalance.wallet-amount,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
    updatedBalance = userData.runningBalance.wallet-amount;
    const updatedUserData = await userModel.findByIdAndUpdate({_id:userId},{$set:{ "runningBalance.wallet":updatedBalance }},{new:true})
    console.log(updatedUserData);
    res.status(200).json({ message:"transaction record has been recor"})
}


module.exports={ credit,debit}