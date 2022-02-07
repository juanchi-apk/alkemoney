const jwt = require('jsonwebtoken');

const authUser = async function(req,res, next) {
/*   console.log(req.headers)
 */  try{
    const token  = req.headers.authorization.split(" ")[1];
    const isNormalAuth = token.length < 500;
    
    let decodedData;
    let userID;

    
  
    if (token && isNormalAuth){


      decodedData = jwt.verify(token, process.env.SESSION_SECRET);
  /*     console.log(decodedData) */
      userID = decodedData?.id;
      email =decodedData?.email;
    
      } else{
       /*  ("aca no tiene que entrar") */
      decodedData = jwt.decode(token);
      userID = decodedData?.sub;
      email = decodedData?.email;
      }
      req.userID = userID;
      req.email = email;
    return next()
  
  }catch{
    return res.status(403).json({message: "se rompe aca."})

  }
  
  
}

module.exports ={
  authUser
}