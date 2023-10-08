import { validationResult } from "express-validator"
export const validationForOrders =['user_id','status']
export const validationForOrderLine= ['products.*.product_id','products.*.quantity','products.*.price_of_purchase']

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