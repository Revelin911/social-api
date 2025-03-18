import { ObjectId } from 'mongodb';
import { Thought, User } from '../models/index';
// Aggregate function to get all users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().populate('friends');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// GET User based on id /users/:id
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
    }
    try {
        const user = await User.findById(userId).populate('friends');
        if (user) {
            return res.json(user);
        }
        else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
// POST User /users
export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// DELETE User based on id /users/:id
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
        }
        await Thought.updateMany({ users: req.params.userId }, { $pull: { users: req.params.userId } }, { new: true });
        return res.json({ message: 'User successfully deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// POST Friends based on /users/:userId/friends
export const addFriend = async (req, res) => {
    console.log('Adding a friend');
    console.log(req.body);
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.body.friendId } }, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// DELETE Friends based on /users/:userId/friends
export const removeFriends = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'No user found with that ID :(' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
