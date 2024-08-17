const jwt = require('jsonwebtoken');
const  PRIVATE_KEY = process.env.PRIVATE_KEY;

const verifyJwt = async(req,res,next) => {

    const auth_header = req.headers["authorization"];
    const token = auth_header.split(' ')[1];

    if(!token){
        return res.status(400).json({ status: "access denied", message: "No token provided" })
    }

    jwt.verify(token,PRIVATE_KEY,async (err, decoded) => {

        if (err) {
          return res.status(400).json({ status: "access denied", message: "token expired", })
        }

        console.log(decoded);
        req.user = decoded;
        next();
      });
    
}


module.exports = {
    verifyJwt
}