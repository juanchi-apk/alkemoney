const { body } = require('express-validator')
const sequelize = require('../../database/index');
const {Users} =sequelize


exports.signupUser = [

    body('email').custom( value => {
       return Users.findOne({ where: { email: value } })
        .then(user=> { if(user){return Promise.reject('E-mail already in use')}});
     }),

     body('username').custom( value => {
        return Users.findOne({ where: { username: value } })
         .then(user=> { if(user){return Promise.reject('Username already in use')}});
      }),
     
     body('email').isEmail().withMessage("E-mail should have a valid format (Example: 'yourname@mail.com')").normalizeEmail(),
     
   body("password").isStrongPassword({
         minLength: 7,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1
     }).withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
     
  
    

     
     body('firstname').custom( value => {
        return value.match(/^[A-Za-z ]+$/)
     }).withMessage("Name field it can only contain letters"),
     body('lastname').custom( value => {
        return value.match(/^[A-Za-z ]+$/)
     }).withMessage("Name field it can only contain letters"),

];

exports.signinUser = [
   body('email').custom( value => {
      return Users.findOne({ where: { email: value } })
       .then(user=> { if(!user){return Promise.reject("The user doesn't exist")}});
    }).bail(),
];




