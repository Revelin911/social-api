import db from '../config/connection.js';
import { Thought, User } from "../models";
import cleanDB from './cleanDB.js';
import { getRandomUser, getRandomThoughts } from './data.js';
try {
    await db();
    await cleanDB();
    // Create empty array to hold users
    const users = [];
    // Loop 20 times. Adding users to users array
    for (let i = 0; i < 20; i++) {
        // Get some random thoughts objects
        const thoughts = getRandomThoughts(20);
        const userInfo = getRandomUser();
        const reactions = userInfo.split(' ')[0];
        const friends = userInfo.split(' ')[1];
        // const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;
        users.push({
            reactions,
            friends,
            thoughts,
        });
    }
    // Add students to the collection and await the results
    const userData = await User.create(users);
    // Add courses to the collection and await the results
    await Thought.create({
        name: 'UCLA',
        inPerson: false,
        students: [...userData.map(({ _id }) => _id)],
    });
    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
}
catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
