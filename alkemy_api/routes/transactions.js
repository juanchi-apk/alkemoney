


/* 


        id_transaction
        amount
        details
        receipts_numbers
        date
        type
       	user_id
        cat_id

        
       */

const server = require('express').Router();
//const transactionValidator = require('../middleware/validators/transation_validators');
const transactionControllers = require('../controllers/transaction');

server.get('/get' , transactionControllers.gettransaction )
server.put('/new',  transactionControllers.newtransaction )
server.post('/change', transactionControllers.changetransaction )
server.delete('/delete', transactionControllers.deletetransaction )

module.exports = server;

