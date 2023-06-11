import express, { NextFunction ,Request, Response, json} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ErrorResponse, IResponse } from './types/typs';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './auth/auth.router';
import todosRouter from './todos/todos.router';
import { checkToken } from './auth/auth.middleware';
dotenv.config();
const app = express();

(async function(){
    try {
        if(process.env.DB_SERVER_URL){
           await mongoose.connect(process.env.DB_SERVER_URL)
           console.log('DB server connected succefully')
        }else{
            throw new Error('DB error')
        }
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
})();

app.use(cors());
app.use(morgan('dev'));
app.use(json());
//routers
app.use('/auth', authRouter) 
app.use('/todos', checkToken, todosRouter) 

///catch all unhandler requests
app.all('*', async(req,res, next)=> next(new ErrorResponse(`route not found`, 404)))

//error handler
app.use((error: ErrorResponse, req: Request, res:Response<IResponse<string>>, next: NextFunction) =>{
    res.status(error.status || 500).json({success: false, data: error.message})
})

app.listen(3000, ()=> console.log('connect to 3000'))