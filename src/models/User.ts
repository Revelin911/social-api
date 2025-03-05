import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: , //array of _id values referencing the Thought model
    friends: , //Array of _id values referencing the User model (self-reference)
}
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// edit all code under
const courseSchema = new Schema<ICourse>(
    {
        name: {
            type: String,
            required: true,
        },
        inPerson: {
            type: Boolean,
            default: true,
        },
        start: {
            type: Date,
            default: Date.now(),
        },
        end: {
            type: Date,
            // Sets a default value of 12 weeks from now
            default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
        },
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: 'student',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    },
);

const Course = model<ICourse>('Course', courseSchema);

export default Course;
