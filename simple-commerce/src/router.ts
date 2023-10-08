import {Router} from 'express'
import { createCategory, getAllCategories, getCategoryId } from './handlers/category';
import { createProduct, getAllProducts, getProduct } from './handlers/product';
import { createOrder } from './handlers/order';
import { body } from 'express-validator';
import { handleInputError, validation } from './modules/middlewares';

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
router.post('/createOrder',body(validation).isString().notEmpty(),handleInputError,createOrder)


export default router;