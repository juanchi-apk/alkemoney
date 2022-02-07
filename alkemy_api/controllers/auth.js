const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const {validationResult } = require('express-validator')
const sequelize = require('../database/index');


const {Users} =sequelize;


exports.signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){

        
        return res.status(400).json({ errors: errors.array() });
    }
    const  {username, firstname,lastname, email, password, confirmPassword} = req.body


    if (password != confirmPassword){
        return res.status(400).json({ errors: [{
            value: `${req.body.password}`,
            msg: "Passwords don't match",
            param : "password",
            location : "body"
            
        }]
    })
        
    

    }

    const encriptedpw = await  bcrypt.hash(password, 10);
    try {
        const user = await Users.create({
            username: username,
            first_name: firstname,
            last_name:lastname,		
            email:email,
            password: encriptedpw,
        })
        const token =  jwt.sign(
            {
                email : user.email,
                id: user.user_id
            }, process.env.SESSION_SECRET, {expiresIn: "1h"})
        
        return res.status(200).json({
            data: {
                result: user,
                token:token
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'No se pudo crear el usuario',
            data: error
        })
    }
    
    
}

exports.signin = async (req, res) =>{
    //console.log(req.body)

    const errors = validationResult(req);
    //console.log(errors)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body

    const user = await Users.findOne({ where: { email: email } })

    
   const passwordConfirmation = await bcrypt.compare(password, user.password)
    
   if(!passwordConfirmation){
    return res.status(400).json({ errors: [{
            value: `${req.body.password}`,
            msg: "Passwords don't match",
            param : "password",
            location : "body"
            }]
        })
    }

    const token = jwt.sign(
        {
            email : user.email,
            id: user.user_id
        }, process.env.SESSION_SECRET, {expiresIn: "1h"})

    return res.status(200).json({ 
        data: {
            result: user,
            token:token
        }
       })

}   

exports.signwith = async (req, res) =>{
  
    const {username, firstname, lastname, email, password} = req.body;
    
    const user = await Users.findOne({ where: { email: email } })

    if (user) {
       return res.status(400).json({ isUser : "true"})
    }

    else{
        
        await Users.create({
            username: username,
            first_name: firstname,
            last_name:lastname,		
            email:email,
            password: password,
        })
        .then(function (user) {
           return  res.status(200).json({
                message: 'El usuario se creo correctamente',
                data: {
                    isUser:"true",
                }
            })
        }).catch(function(error){
            return res.status(400).json ({error: error})
        })


    }


}