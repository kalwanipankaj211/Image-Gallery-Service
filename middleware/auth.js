const dotenv = require('dotenv')
dotenv.config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    const error = new Error();
    error.status = 403;
    if(authHeader)
    {
        const token = authHeader.split('Bearer ')[1];
        if(token)
        {
            try{
                const user = jwt.verify(token, SECRET_KEY);
                req.uesr = user;
                return next();
            }
            catch(e)
            {
                error.message = 'invalid/expired token';
                return next(error);
            }
        }
        error.message = 'invalid expired token'
        return next(error);
    }
    error.message  = 'authorization token must be a Bearer [token]';
    return next(error);
}