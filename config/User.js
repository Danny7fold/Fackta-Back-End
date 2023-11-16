/**
 * validators for signup

 */

const userDataValidate = (req, res, next) => {
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validatePhone = (phone) => {
    return phone.match(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    );
  };
 
  let errorMessage 
 
  if (!req.body.fullname) {
    errorMessage = "fullname is required";
  }
  if (req.body.fullname.length < 3) {
    errorMessage = "fullname must be at least 3 characters";
  }
  

  if (!req.body.email) {
    errorMessage = "email is required";
  }

  if (validateEmail(req.body.email)){
   console.log('valid')
  }else {
    errorMessage = "provide valid email";
  }

  if (validatePhone(req.body.phone)){
    console.log('valid')
   }else {
     errorMessage = "provide a valid phone number";
   }

  // send error
  if (errorMessage!=undefined) {
    
    res.status(400).json({ success: false, errorMessage });
   return false
  }
else{
  return true
}

};

module.exports = { userDataValidate };
