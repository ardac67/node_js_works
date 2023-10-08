import {Router} from 'express'
import { createCategory, getAllCategories, getCategoryId } from './handlers/category';
import { createProduct, getAllProducts, getProduct } from './handlers/product';
import { createOrder,getOrders, updateOrders } from './handlers/order';
import { body } from 'express-validator';
import { handleInputError,  validationForOrderLine,  validationForOrders } from './modules/middlewares';

const router=Router()

/*category routes*/
router.post('/createCategory',createCategory)
router.get('/getAllCategories',getAllCategories)
router.get('/getCategoryId/:categoryName',getCategoryId)

/*product routes*/
router.post('/createProduct',createProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getProduct/:filter',getProduct)

/*order routes*/
router.post('/createOrder',body(validationForOrders).notEmpty(),body('products').isArray(),body(validationForOrderLine).notEmpty(),handleInputError,createOrder)
router.get('/getOrders/:filter',getOrders)
router.put('/updateOne/:filter',updateOrders)

router.use((err,req,res,next) => { 
    res.status(401)
    res.json({message:"bad req"})
})
export default router;