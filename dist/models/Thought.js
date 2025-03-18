import { Schema, Types, model } from 'mongoose';
//Schema Settings: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
const reactionSchema = new Schema({
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
}, {
    timestamps: true,
    toJSON: {
        getters: true,
    },
});
const thoughtSchema = new Schema({
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
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
