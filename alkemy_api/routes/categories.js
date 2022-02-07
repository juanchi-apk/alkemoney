const server = require('express').Router();
const sequelize = require('../database/index');
const {Categories} =sequelize




server.get('/', async function (req,res){

    await Categories.findAll()
    .then(function (categories) {
        console.log(Categories)
        res.json({
            data: {
               categories,
            }
        })
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).json({
            message: 'No se puedo acceder a las categorias',
            data: error
        })
    })

    })



server.post('/add', async function(req , res){
    
 


 
   
  await Categories.create({

    
		cat_name: req.body.data.category,
		
    })
    .then(function (category) {

       Categories.findAll()
        .then(function (categories) {
            console.log(Categories)
            res.json({
                data: {
                   categories,
                }
            })
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({
                message: 'No se puedo acceder a las categorias',
                data: error
            })
        })
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).json({
            message: 'No se pudo crear la categoria',
            data: error
        })
    })

    
});

module.exports = server;