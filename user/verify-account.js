const app = require("express").Router();
const db = require("../config/db");
const redisClient = require("../config/redis");
const User = require("../config/User");
const fs = require("fs");
const { promisify } = require("util");
var CryptoJS = require("crypto-js");

// REGISTERS A USER
app.post("/auth/verify-account", async (req, res, next) => {
  try {
   
    let {
      body: { token, email  },
      session,
    } = req;




let userSession = await  redisClient.hGetAll(email);
console.log(userSession)
if(userSession.email_verification_token==token){
  res.json({
          
   
    mssg: 'verification successful',
    success: true
  });
}else{
  res.json({
    mssg: `verification failed`,
    error: true
  });
}




  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
