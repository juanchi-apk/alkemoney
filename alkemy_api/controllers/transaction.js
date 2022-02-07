const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const sequelize = require('../database/index');
const { Transactions, Users,Categories} = sequelize;
const env = require('dotenv');



exports.gettransaction = async (req, res) => {

  const { userID, email } = req


  
  try {
    const userData = await Users.findOne({ where: { email: email } })

    
    try {
      const userTransactions = await Transactions.findAll({ where: { user_id: userData.user_id } })
      
      let incomes = [];
      let outcomes = [];
      let balance = 0 ;
   
      if(userTransactions.length==0){
        return res.status(400).json({  
          message: "User has no transactions",
          data: { isUser: true, hasTransactions: false }})
      }else{

        for (const element of userTransactions) {
          console.log(typeof element.dataValues.amount)
         if (element.dataValues.type==0){
          incomes.push(element)
          balance += element.dataValues.amount
         }
         if (element.dataValues.type==1){
          outcomes.push(element)
          balance -= element.dataValues.amount
         }
        }
      console.log(balance)
      return res.status(200).json({ 
      message: "Received transactions ",
      data : { 
        userTransactions : {
          allTransactions:userTransactions,
          incomes: incomes,
          outcomes: outcomes,
          balance:balance,
        }, 
       
        isUser: true, 
        hasTransactions: true }})
    }



  }
  catch{
        console.log("está vacio en el catch primero")
      return res.status(400).json({  
        message: "User has no transactions",
        data: { isUser: true, hasTransactions: false }})
    }
    
    
  }
  catch{
    console.log("está vacio en el catch segundo")
    return res.status(400).json({ message: "is not a user", isUser: false, hasTransactions: false })
  }

/* 

    if (!userData) { 
      return res.status(400)
      .json()
    }
    else {
      console.log("Este es el usertransaction" + c)
      if(userTransactions.length>0){
        console.log("esta entrando aca")
      }else{  
        console.log("nada")
      }
      
      if (!userTransactions||userTransactions==null) { 
        return res.status(200).json({  
          message: "User has no transactions",
          data: { isUser: true, hasTransactions: false }})
      }
      else {
        return res.status(200)
        .json({ 
          message: "Received transactions ",
          data : { 
            userTransactions,  
            isUser: true, 
            hasTransactions: true }})
      }
    }
   
  }catch {
    console.log('hasnodata')
  } */
}

exports.newtransaction = async (req, res) => {
console.log(req)
const { userID, email } = req;


  let nowDate = new Date();
  console.log(nowDate)
 let type
  if(req.body.isIncome){
    type = 0
  }
  if(req.body.isOutcome){
    type = 1
  }
  const {amount, category, details} = req.body
  const floatedAmount = parseFloat(amount)
  console.log(typeof floatedAmount)

  try{
    const userData = await Users.findOne({ where: { email: email } })
    
    if (!userData) { 
      return res.status(400)
      .json({ message: "is not a user", isUser: false, hasTransactions: false })
    }
    console.log(typeof amount)
    const transaction = await Transactions.create({
    amount: floatedAmount,
    details: details, 
    date: nowDate,
  	type : type ,
	  user_id: userData.user_id ,
    cat_id: category,
    })

  res.status(200).json({data : {transaction}})
   
  
}catch{
  console.log(error)
}

}


exports.changetransaction = async (req, res) => {


  const{amount, category, details, transactionID,cat_id} = req.body
  const { userID, email } = req;
 /*  console.log("amount: " + amount)
  console.log("category: " + category)
  console.log("details: " + details)
  console.log("transactionID: " + transactionID)
  console.log("cat_id: " + cat_id)
  console.log("userID: " + userID)
  console.log("email: " + email) */


console.log(typeof cat_id) 

  let newCat;
  try{
  


  if(category.length!=0){

    const selected_cat_id = await Categories.findOne({where:{cat_name: category}})
    newCat = selected_cat_id.cat_id
  }else{
    newCat = cat_id;
    
  }

    const changedTransaction = await Transactions.update ({
      amount: amount, 
      details:details,
      cat_id: newCat,

    },{where:{
      id_transaction : transactionID
    }})
  

  console.log(changedTransaction)
  

  res.status(200).json({data:"todo bien"})
}catch{
  res.status(400).json({data:"todoalagoma"})
}
};

exports.deletetransaction = async (req, res)=>{
  const { userID, email } = req;
  const transactionID = (req.body.transactionID)
 
 try{ await Transactions.destroy({
    where:{
      id_transaction : transactionID
    }
  }) 

  res.status(200).json({ message:"ok"})
}catch{

}
}