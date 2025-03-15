import { Request, Response } from 'express';
import { Thought, User } from '../models/index'

// Returns an array of Thoughts
export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch(error: any){
        res.status(500).json({
            message: error.message
        });
    }
}

// GET Thought based on id /thought/:id
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
      const user = await Thought.findById(thoughtId);
      if(user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: 'No user available'
        });
      }
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  // POST Thought /thoughts
export const createThought = async (req: Request, res: Response) => {
    const { thought } = req.body;
    try {
      const newThought = await Thought.create({
    thought
      });
      res.status(201).json(newThought);
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

// PUT Thought based on id /thoughts/:id
export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id to update' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  // DELETE Thought based on id /thoughts/:id
export const deleteThoughts = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId});
      
      if(!thought) {
        res.status(404).json({
          message: 'No thought with this id to delete'
        });
      } else {
        await User.deleteMany({ _id: { $in: thought.user } });
        res.json({ message: 'User and their thoughts deleted!' });
      }
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };
