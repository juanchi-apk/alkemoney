const Sequelize = require('sequelize');
const env = require('dotenv');
const fs = require('fs');
const path = require('path');


env.config();

const {
  DB_HOST, 
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const basename = path.basename(__dirname);

const models =[];

fs.readdirSync(path.join(__dirname, '/models'))
.filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
.forEach((file) => {
  models.push(require(path.join(__dirname, '/models', file)));
});


const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST
});


// Injectamos la conexion (sequelize) a todos los modelos
models.forEach(model => model(sequelize));


//Seleccionamos el objeto model
let entries = Object.entries(sequelize.models);
//convertimos el nombre a mayuscula
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);


//Hacemos update del modelo en sequelize
sequelize.models = Object.fromEntries(capsEntries);

//para chequear modelos
//console.log(sequelize.models)

const { Users, Transactions, Categories} = sequelize.models;




Users.hasMany(Transactions);
Transactions.belongsTo(Users);
Categories.hasMany(Transactions);
Transactions.belongsTo(Categories);




module.exports =  {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');

  sequelize : sequelize,
}
