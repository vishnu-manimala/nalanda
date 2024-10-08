const utils = require('../utils/shared.functions')
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const  PRIVATE_KEY = process.env.PRIVATE_KEY;

const register = async (req, res) =>{
   
    const { name, email, password, role } = req.body;
    try{
        const
         encryptedPassword = await utils.encrypt(password);

        const userData = await User.create({
            name: name,
            email: email,
            password: encryptedPassword,
            role: role,
            createdAt: new Date(),
          });

          res.status(200).json({status: "success", message:" successfully registered"});

    }catch(err){
        console.log(err);
        res.status(500).json({status: "failed", message:" something went wrong"});
    }
}

const login = async( req, res ) =>{
    const { email, password } = req.body;

    const user_data = await User.findOne({ email: email });

    if (!user_data) {
        return res
          .status(401)
          .json({ data: null, status: "Error", message: "No user found" });
      }

      const passwordMatch = await utils.password_match(password, user_data.password);

      if (!passwordMatch) {
        return res.status(401).json({
          data: null,
          status: "Error",
          message: "Username & password mismatch",
        });

      }

      const access_token = await utils.tokenGenerator({_id:user_data._id, email:user_data.email, role: user_data.role});
      const refresh_token = await utils.refreshTokenGenerator({_id:user_data._id, email:user_data.email, role: user_data.role});

      const save_token = await User.updateOne({_id:user_data._id},{$set:{refresh_token: refresh_token}});

      res.setHeader('Authorization', `Bearer ${access_token}`)
      res.cookie('refresh_token', refresh_token, { httpOnly: true });
      res.status(200).json({ message: 'Login successful', data: user_data });

}

const refreshtoken = async(req, res) =>{
  const refresh = req.cookies.refresh_token;
  if (!refresh) {
    return res.status(401).json({ status: "authorizationError", message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refresh, PRIVATE_KEY);
    const access_token = await utils.tokenGenerator({_id:decoded._id, email:decoded.email, role:decoded.role});
    
    req.user = decoded;

    res.setHeader('Authorization', `Bearer ${access_token}`)
    res.json({message:"access token created, resend user request"})
    
  } catch (error) {
    return res.status(403).json({ status: "authorizationError", message: "login again"});
  }
}

module.exports = {
    register,
    login,
    refreshtoken
}