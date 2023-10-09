import { validationResult } from "express-validator"
export const validationForOrders =['user_id','status']
export const validationForOrderLine= ['products.*.product_id','products.*.quantity','products.*.price_of_purchase']
import jwt from 'jsonwebtoken'

export const handleInputError = (req,res,next) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        res.status(400)
        res.json({errors:errors.array()})
    }
    else{
        next();
    }
}

export const authorizeJWT =  (allowedRoles) =>{
    return function (req,res,next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Missing token' });
        }
        const token1 = token.split(' ')[1];
        //console.log(token.split(' '))
        try {
            jwt.verify(token1, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: 'Unauthorized - Invalid token' });
            }
    
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden - Insufficient permissions' });
            }
    
            req.user = decoded;
            next();
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
}