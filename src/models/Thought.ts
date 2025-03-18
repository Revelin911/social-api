import { Schema, Types, model, type Document } from 'mongoose';

interface IReaction {
    reactionId: Types.ObjectId,
        reactionText: string,
        createdAt: Date,
        updatedAt: Date,
        username: string,
        }

interface IThought extends Document {
    thoughtText: string,
    createdAt: Date,
    updatedAt: Date,
    username: string,
    reactions: IReaction[], //Array of nested documents created with the reactionSchema
}

//Schema Settings: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
type: Schema.Types.ObjectId,
default: () => new Types.ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        //     get: (timestamp) => new Date(timestamp).toLocaleString(),
        // },
        username: {
type: String,
required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
    }
);

const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    timestamps: true,
        toJSON: {
        virtuals: true,
        getters: true,
        },  
    });

    //Virtual for reaction count
 thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
 });

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
