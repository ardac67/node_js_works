import {Router} from 'express'
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from './modules/middlewares';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/products';
const router = Router()
/*
Product handlers
*/
router.get('/product',getProducts)
router.get('/product/:id',getOneProduct)
router.put('/product/:id',body('name').isString(),handleInputErrors,updateProduct)
router.post('/product',body('name').isString(),handleInputErrors,createProduct)
router.delete('/product/:id',deleteProduct)

/*
Update handlers
*/
router.get('/update',()=>{})
router.get('/update/:id',(req,res)=>{})
router.put('/update/:id',
body('title').optional,
body('body').optional,
body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']),
body('version').optional
,(req,res)=>{
   
})
router.post('/update',
body('title').exists(),
body('body').exists().isString(),()=>{})
router.delete('/update/:id',()=>{})

/*
Update points handlers
*/
router.get('/updatepoint',()=>{})
router.get('/updatepoint/:id',()=>{})
router.put('/updatepoint/:id',
body('name').optional().isString(),
body('description').isString(),
()=>{})
router.post('/updatepoint',
body('name').optional().isString(),
body('description').isString(),
body('updateId').exists().isString(),
()=>{})
router.delete('/updatepoint/:id',()=>{})

export default router