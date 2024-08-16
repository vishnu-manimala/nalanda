const jwt = require('jsonwebtoken');
const  PRIVATE_KEY = process.env.PRIVATE_KEY;
const helper = require('../utils/helper.functions');

const verifyJwt = async(req,res,next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(400).json({ status: "access denied", message: "No token provided" })
    }

    jwt.verify(token,PRIVATE_KEY,async (err, decoded) => {
        if (err) {
          return res.status(400).json({ status: "access denied", message: "token expired", })
        }
        console.log(decoded);
        req.user = decoded.userData;
        next();
      });
    
}


module.exports = {
    verifyJwt
}