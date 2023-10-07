import express from 'express'
import router from './router'
import morgan from 'morgan'
import {protect} from './modules/auth'
import {createNewUser,signin} from '../source/handlers/user'

const app = express()
app.use(morgan('dev '))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{

})

app.use('/api',protect,router)
app.post('/user',createNewUser)
app.post("/signin", signin);

export default app

