
const { DataTypes } = require('sequelize');


const Transaction = (sequelizedb)=>{
    
    sequelizedb.define( "transactions", {
	    
        id_transaction: {
		type: DataTypes.INTEGER,
		primaryKey: true,
        allowNull: false,
        autoIncrement: true,

	},
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

    details:{
        type: DataTypes.STRING,
        allowNull: false, 
    }, 
    receipts_numbers:{
        type: DataTypes.STRING,
        allowNull: true

    },
    date: {
       type: DataTypes.DATE,
       allowNull:false,
    },
	type:{
        type: DataTypes.INTEGER,
        allowNull: false,
    } ,
	user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    } ,
    cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    
    

    })
}





module.exports = Transaction;