const jwt = require("jsonwebtoken");


function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    // console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        //Authorization: Bearer <access_token>
        const bearer = bearerHeader.split(' ');
        // console.log(bearer)
        const bearerToken = bearer[1];
        // req.userData = bearerToken;
        jwt.verify(bearerToken, '@nc3Up0Nt!m3', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                req.userData = authData;
            }
        })
        next();
    } else {
        res.sendStatus(403);
    }

}

module.exports = {verifyToken};