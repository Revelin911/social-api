import { Schema, model } from 'mongoose';
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true,
        match: /.+\@.+\..+/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
}, {
    toJSON: {
        virtuals: true,
    }
});
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
