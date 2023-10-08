import { validationResult } from "express-validator"
export const validation =['user_id','status','products','product_id','quantity','price_of_purchase']

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