import { Schema, Types, model, type Document } from 'mongoose';

//SCHEMA ONLY, This will be used as the reaction field's subdocument schema in the Thought model.

interface IReaction extends Document {
    reactionId: Types.ObjectId, //Use Mongoose's ObjectId data type. Default value is set to a new ObjectId
    reactionBody: string,
    username: string,
    createdAt: Date,
}
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
type: Schema.Types.ObjectId,
default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
type: String,
required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleString(),
        },
    },
);
//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.