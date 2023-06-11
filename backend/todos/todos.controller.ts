import { RequestHandler } from "express-serve-static-core";
import { ErrorResponse, IResponse, bodyToken } from "../types/typs";
import todosModel, { ITodo } from "./todos.model";

export const  getTodos: RequestHandler<unknown, IResponse<ITodo[]>, bodyToken> = async(req, res, next) =>{
    try {
        const {tokenData:{_id: user_id} } =req.body;
        const results = await todosModel.find({user_id});
        res.json({success: true, data: results})
    } catch (error) {
        next(error)
    }
};


export const addTodo: RequestHandler<unknown, IResponse<ITodo>,bodyToken & ITodo> = async (req, res, next) => {
    try {
        const { tokenData: { _id: user_id } } = req.body;
        const results = await todosModel.create({
            ...req.body,
            user_id
        });
        res.json({ success: true, data: results })
    } catch (error) {
        next(error)
    }
}

////get one by ID
export const  getTodoById: RequestHandler<{todo_id:string}, IResponse<ITodo>, bodyToken> = async (req, res, next) =>{
    try {
        const {tokenData:{_id: user_id} } =req.body;
        const {todo_id} = req.params;
        const results = await todosModel.findOne({_id: todo_id, user_id}).lean()
        res.json({success: true, data: results as ITodo})
    } catch (error) {
        next(error)
    }
};


//////update 
export const updateTodoById : RequestHandler<{todo_id:string}, IResponse<number>, bodyToken & ITodo>=  async(req, res, next) =>{
    try {
        const {tokenData:{_id: user_id} } =req.body;
        const {todo_id} = req.params;
        const results = await todosModel.updateOne(
            {_id:todo_id, user_id},
            req.body
            );
            // if(!results.modifiedCount) throw new ErrorResponse('did not find match to update', 201)
            res.json({success: true, data: results.modifiedCount})
    } catch (error) {
        next(error)
    }
};

////delete 
export const deleteTodoById: RequestHandler<{todo_id:string}, IResponse<number>, bodyToken> = async (req, res, next) =>{  
try {
    
    const {tokenData:{_id: user_id} } =req.body;
    const {todo_id} = req.params;
    const results = await todosModel.deleteOne(
        {_id:todo_id, user_id} );
        if(!results.deletedCount) throw new ErrorResponse('did not find match to update', 201)
        res.json({success: true, data: results.deletedCount}) 
} catch (error) {
    next(error)
}
};
