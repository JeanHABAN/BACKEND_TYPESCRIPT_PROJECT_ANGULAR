import { RequestHandler } from "express"
import { ErrorResponse, IResponse } from "../types/typs"
import userModel, { IUser } from "../user/user.model"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

///generic will be request params, response body,request body, request query
export const signup: RequestHandler<unknown, IResponse<IUser>, IUser> = async (req, res, next) => {
    try {
        const new_user = req.body;
        const { password: plain_password } = new_user;
        if (!plain_password) throw new Error('password not found')
        const hashed_password = await bcrypt.hash(plain_password, 10);
        const results = await userModel.create({
            ...new_user, password: hashed_password
        })
       
        res.json({ success: true, data: results })
       
    } catch (error) {
        next(error)
    }
}

////signin
export const signin: RequestHandler<unknown, IResponse<string>, {email:string, password:string}>= async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email}).lean();
        if(!user){
            throw new ErrorResponse(' user not found ', 401)
        }
        const matchPswd = await bcrypt.compare(password, user.password!);
        if(!matchPswd){
            throw new ErrorResponse(`wrong password`, 401)
        }
         if(!process.env.PRIVATE_KEy) throw new ErrorResponse('private not found ',500)
        const token = jwt.sign({
            _id: user._id,
            fullname:user.fullname,
            email: user.email    
        }, process.env.PRIVATE_KEy)

       res.json({success: true, data: token})
    } catch (error) {
        next(error)
    }
}