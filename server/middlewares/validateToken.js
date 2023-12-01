import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const authRequired = (req, res, next) => { 
    const {token} = req.cookies

    if (!token) return res.status(401).json({ message: 'Unauthorizedd' });

    jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
        if (err) return res.status(403).json({ message: 'Unauthorizedd' });
        
        req.user = user;
        
        next();
    }) 


}