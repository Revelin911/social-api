import { Schema, model, type Document, Types } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Types.ObjectId[]; //array of _id values referencing the Thought model
    friends: Types.ObjectId[]; //Array of _id values referencing the User model (self-reference)
}
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const userSchema = new Schema<IUser>(
    {
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
    },
    {
        toJSON: {
            virtuals: true,
        }
    },
);

    userSchema.virtual('friendCount').get(function() {
return this.friends.length;
    });

const User = model<IUser>('User', userSchema);

export default User;
