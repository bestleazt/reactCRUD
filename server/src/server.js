import express from 'express';
import morgan  from 'morgan';
import cors  from 'cors';
import dotenv from 'dotenv';
import noteRoutes  from './routes/noteRoutes.js'
import { connectDB } from './config/db.js';
import ratelimiter from './middleware/rateLimiter.js';

const app = express();
dotenv.config();


// middleware 
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(ratelimiter)

// route
app.use('/api/notes',noteRoutes)



const PORT = process.env.PORT || 5001
connectDB().then(()=>{
   app.listen(PORT, ()=>{
    console.log("Server started on PORT:",PORT);
}); 
}) // connect Database

