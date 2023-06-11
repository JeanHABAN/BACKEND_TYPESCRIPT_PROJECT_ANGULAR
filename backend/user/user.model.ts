import {InferSchemaType, model, Schema} from 'mongoose';
const schema = new Schema({
    fullname: String,
    email: {type: String, require :true, unique:true},
    password: String,
    pictures: {type: Array<{url:String}> ,require: false}

})

export type IUser = InferSchemaType<typeof schema>
export default model <IUser>('user', schema)