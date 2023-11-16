//User Routes
const  signUpR = require('./user/signup-route')
const  verificationR = require('./user/verify-account')


const AppRoutes = app => {
    //User Authentication
    app.use('/api', signUpR)
    app.use('/api', verificationR)
}


module.exports = AppRoutes