const bcrypt = require('bcryptjs');
const {DataTypes } = require('sequelize');

const Category = (sequelizedb)=>{

	sequelizedb.define('categories', {
		cat_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true	
		},
		
		cat_name:{
			type: DataTypes.STRING,
			isAlpha: true,
            allowNull: false,

		}
	 } ,
	 {
		underscored:true,
	
  	})
	  
}



module.exports = Category;