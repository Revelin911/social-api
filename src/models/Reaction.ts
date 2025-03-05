import { Schema, Types, model, type Document } from 'mongoose';

//SCHEMA ONLY, This will be used as the reaction field's subdocument schema in the Thought model.

interface IReaction extends Document {
    reactionId: , //Use Mongoose's ObjectId data type. Default value is set to a new ObjectId
    reactionBody: string,
    username: string,
    createdAt: Date,
}