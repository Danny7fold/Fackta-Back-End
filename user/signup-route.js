const app = require("express").Router();
const db = require("../config/db");
const redisClient = require("../config/redis");
const User = require("../config/User");
const fs = require("fs");
const { promisify } = require("util");
const sendEmail = require("../config/Mail");
var CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');

const sendMailAndcreateDir = async (fullname, email, res, ciphertext) => {
  let url = `http://localhost:3000/v1/activate-account?token=${ciphertext}&email=${email}`,
    options = {
      from: "cannylog75@gmail.com",
      to: email,
      subject: "Welcome to Fackta",
      url: url,
      fullname,
    };
  try {
    console.log("url =>", url);
    await sendEmail(options);

    res.json({
      fullname,
      mssg: `Hello, ${fullname}!!`,
      success: true,
    });
  } catch (error) {
    res.json({
      mssg: `Hello, ${fullname}. Mail could not be sent!!`,
      success: true,
    });
  }
};

// REGISTERS A USER
app.post("/auth/signup", async (req, res, next) => {
  try {
    // crypto token

    var ciphertext = CryptoJS.AES.encrypt(
      "my message",
      "secret key"
    ).toString();
    let {
      body: { fullname, email, phone },
     session
    } = req;

    if (User.userDataValidate(req, res, next) == true) {
      const emailCount = await db.query(
        `SELECT COUNT(email) as emailCount from users WHERE email='${email}'`
      );

      if (emailCount.rows[0].emailcount == 1) {
        res.json({ mssg: "Email already exists!!" });
      } else {
        let newUser = {
          fullname,
          email,
          phone,
        };
        if(fullname!==""&&email!==""){
          req.session.id = uuidv4();
        }
        
        await redisClient.hSet(email, {
          fullname,
          email,
          phone,
          email_verification_token: ciphertext,
          session:req.session.id
        });

        sendMailAndcreateDir(fullname, email, res, ciphertext);
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = app;
