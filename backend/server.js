import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import connectDb from './config/db.js';
connectDb();

const app = express()

const port = process.env.PORT || 4000;

app.use('/api/users',userRoutes)



app.get('/',(req,res)=>res.send('server running...'))

app.use(notFound)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
})