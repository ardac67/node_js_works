import express from 'express'
import morgan from 'morgan'
import { protect } from './modules/auth'
import router from './router'
import { createNewUser, signin } from './handlers/user'
import { body } from 'express-validator'
import { authorizeJWT, handleInputError } from './modules/middlewares'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res) => {
    res.json({message:"Welcome"})
})

app.post('/user',body(['username','password','role']).isString().notEmpty(),handleInputError,createNewUser)
app.post('/signin',body(['username','password']).isString().notEmpty(),handleInputError,signin)

app.use('/api',protect,authorizeJWT('admin'),router)



export default app