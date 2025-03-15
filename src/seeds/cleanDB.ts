import { Thought, User } from "../models";

const cleanDB = async (): Promise<void> => {
  try {
    await Thought.deleteMany({});
    console.log('Thought collection deleted.');

    await User.deleteMany({});
    console.log('User collection deleted.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
