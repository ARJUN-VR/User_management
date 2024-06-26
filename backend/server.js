import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDb from './config/db.js';
import adminRoutes from './routes/adminRoutes.js'

connectDb();

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


app.use('/api/users',userRoutes)
app.use('/api/admin',adminRoutes)

app.use(notFound)
app.use(errorHandler)




const port = process.env.PORT || 4000;


app.get('/',(req,res)=>res.send('server running...'))


app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
})