import { RequestHandler } from "express";
import { ErrorResponse, IToken} from "../types/typs";
import jwt from 'jsonwebtoken';

export const checkToken: RequestHandler = async (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) throw new ErrorResponse(`token not found`, 401)

        const getToken = header.split(' ')[1];
        if (!getToken) throw new ErrorResponse(`token is incorrect`, 401);
        const decoded_token = jwt.verify(getToken, process.env.PRIVATE_KEY!)
        if (!decoded_token) throw new ErrorResponse(`wrong token signature`, 401);
        req.body['tokenData'] = decoded_token as IToken;
        next()
    } catch (error) {
        next(error)
    }
}