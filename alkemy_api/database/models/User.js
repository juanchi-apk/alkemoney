
const {DataTypes } = require('sequelize');

const User = (sequelizedb)=>{

	sequelizedb.define('users', {
		user_id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true	
		},
		
		username: {
			type: DataTypes.STRING,
			required: true,
			allowNull:true,
		} ,

		first_name:{
			type: DataTypes.STRING,
			isAlphanumeric: true,
			allowNull:true,
		},

		last_name:{
			type: DataTypes.STRING,
			isAlphanumeric: true,
			allowNull:true,
			
		},
		
		email: {
			type: DataTypes.STRING,
			isEmail:true,	
			required:true,
			allowNull:true,
			len:[7,80]

		},

		password: {
			type: DataTypes.STRING,
			allowNull:true
		},
		updated_at: {type:DataTypes.DATE},
		deleted_at: {type:DataTypes.DATE}

	},

		{
			underscored:true,
			paranoid:true,
		},
	
  	);
}

module.exports = User;