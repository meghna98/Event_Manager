const jwt = require('jsonwebtoken');

const verify = (req,res,next)=>{
    // console.log('came to verify with',req.body)
    const receivedToken = req.header('auth_token');
    if(!receivedToken)
        res.send('Access Denied')
    jwt.verify(receivedToken,process.env.SECRET_TOKEN,(err,verifiedToken)=>{
        if(err)
            res.send('0')
        req.user = verifiedToken
        // console.log('req.user = ',req.user) 
    })
    next()
}

module.exports.verify = verify;