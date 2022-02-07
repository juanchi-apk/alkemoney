const server = require('express').Router();
const sequelize = require('../database/index');
const {Users} =sequelize;






server.get('/',  (req,res)=>{
    res.send("HolaMundo desde users")
} )




module.exports = server;