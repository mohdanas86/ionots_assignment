// // const mongoose = require("mongoose");
// // const User = require("./model/User");
// // const Project = require("./model/Project");
// // require("dotenv").config();

// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => console.log("Connected to MongoDB"))
// //   .catch((err) => console.error(err));

// // const seedDatabase = async () => {
// //   try {
// //     // Clear existing data
// //     await User.deleteMany({});
// //     await Project.deleteMany({});

// //     // Add Users
// //     const users = await User.insertMany([
// //       { name: "Alice", email: "alice@example.com", username: "alice", score: 50 },
// //       { name: "Bob", email: "bob@example.com", username: "bob", score: 30 },
// //       { name: "Charlie", email: "charlie@example.com", username: "charlie", score: 40 },
// //     ]);

// //     console.log("Users added:", users);

// //     // Add Projects
// //     const projects = await Project.insertMany([
// //       {
// //         title: "Project 1: Build a Chatbot",
// //         description: "Create a chatbot using Python and NLP libraries.",
// //         assignedTo: users[0]._id,
// //         progress: 60,
// //       },
// //       {
// //         title: "Project 2: Data Visualization",
// //         description: "Visualize a dataset using Matplotlib and Seaborn.",
// //         assignedTo: users[1]._id,
// //         progress: 80,
// //       },
// //       {
// //         title: "Project 3: AI Model Training",
// //         description: "Train an AI model using TensorFlow on a dataset.",
// //         assignedTo: users[2]._id,
// //         progress: 20,
// //       },
// //     ]);

// //     console.log("Projects added:", projects);

// //     // Close the connection
// //     mongoose.connection.close();
// //   } catch (err) {
// //     console.error(err);
// //     mongoose.connection.close();
// //   }
// // };

// // seedDatabase();


const mongoose = require('mongoose');
const User = require('./model/User'); // Your User model
const Project = require('./model/Project'); // Your Project model

// const users = [
//   {
//     name: 'Anas',
//     email: 'anas@example.com',
//     username: 'anas123',
//   },
//   {
//     name: 'stom',
//     email: 'stom@example.com',
//     username: 'stom123',
//   },
// ];

// const projects = [
//   {
//     title: 'Project 1: AI Model Training',
//     description: 'Train an AI model using TensorFlow on a dataset.',
//     status: 'Pending',
//     progress: 0,
//     score: 0,
//     assignedTo: '', // To be populated based on the user assignments
//     dueDate: new Date('2024-12-30'),
//   },
//   {
//     title: 'Project 2: Data Analysis with Python',
//     description: 'Perform data analysis using Python and libraries like pandas.',
//     status: 'Pending',
//     progress: 0,
//     score: 0,
//     assignedTo: '', 
//     dueDate: new Date('2024-12-15'),
//   },
//   {
//     title: 'Project 3: Web Scraping with Node.js',
//     description: 'Build a web scraper using Node.js and Cheerio.',
//     status: 'Pending',
//     progress: 0,
//     score: 0,
//     assignedTo: '', 
//     dueDate: new Date('2024-12-25'),
//   },
//   {
//     title: 'Project 4: Image Classification with CNN',
//     description: 'Train a Convolutional Neural Network for image classification.',
//     status: 'Pending',
//     progress: 0,
//     score: 0,
//     assignedTo: '',
//     dueDate: new Date('2024-12-22'),
//   },
//   {
//     title: 'Project 5: Building a Recommendation System',
//     description: 'Build a recommendation system using collaborative filtering.',
//     status: 'Pending',
//     progress: 0,
//     score: 0,
//     assignedTo: '',
//     dueDate: new Date('2024-12-28'),
//   },
// ];

// const seedDatabase = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect('mongodb+srv://anas:anas@food.t6wubmw.mongodb.net/foodApp?retryWrites=true&w=majority&appName=food');

//     // Delete existing users and projects
//     await User.deleteMany({});
//     await Project.deleteMany({});

//     // Create users
//     const [user1, user2] = await User.create(users);

//     // Assign projects to users
//     projects[0].assignedTo = user1._id; // Assign Project 1 to User 1
//     projects[1].assignedTo = user1._id; // Assign Project 2 to User 1
//     projects[2].assignedTo = user1._id; // Assign Project 3 to User 1
//     projects[3].assignedTo = user2._id; // Assign Project 4 to User 2
//     projects[4].assignedTo = user2._id; // Assign Project 5 to User 2

//     // Create projects
//     await Project.create(projects);

//     console.log('Database seeded successfully!');
//     process.exit();
//   } catch (err) {
//     console.error('Error seeding database:', err);
//     process.exit(1);
//   }
// };

// seedDatabase();



// seed.js
// const mongoose = require('mongoose');
// const User = require('./model/User'); // Update the path based on your User model location
// const Project = require('./model/Project'); // Update the path based on your Project model location

const seedData = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb+srv://anas:anas@food.t6wubmw.mongodb.net/foodApp?retryWrites=true&w=majority&appName=food');
    console.log('Connected to database.');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});

    // Create users with the `username` field
    const user1 = new User({
      username: 'johndoe', // Added username field
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });
    const user2 = new User({
      username: 'janesmith', // Added username field
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password: 'password456',
    });

    await user1.save();
    await user2.save();

    console.log(user1)
    console.log(user2)

    // Create projects
    const projects = [
      {
        title: 'Project 1: Website Development',
        description: 'Develop a responsive website using React and Tailwind CSS.',
        assignedTo: user1._id,
        status: 'Pending',
        progress: 0,
        score: 0,
      },
      {
        title: 'Project 2: API Development',
        description: 'Create a RESTful API using Node.js and Express.',
        assignedTo: user1._id,
        status: 'Pending',
        progress: 0,
        score: 0,
      },
      {
        title: 'Project 3: AI Model Training',
        description: 'Train an AI model using TensorFlow on a dataset.',
        assignedTo: user1._id,
        status: 'In Progress',
        progress: 30,
        score: 5,
      },
      {
        title: 'Project 4: Database Design',
        description: 'Design and implement a MongoDB database schema.',
        assignedTo: user1._id,
        status: 'Completed',
        progress: 100,
        score: 10,
      },
      {
        title: 'Project 5: Mobile App Development',
        description: 'Develop a mobile app using React Native.',
        assignedTo: user2._id,
        status: 'Pending',
        progress: 0,
        score: 0,
      },
      {
        title: 'Project 6: DevOps Pipeline',
        description: 'Implement CI/CD pipeline using Jenkins.',
        assignedTo: user2._id,
        status: 'Pending',
        progress: 0,
        score: 0,
      },
      {
        title: 'Project 7: Data Visualization',
        description: 'Create interactive dashboards using D3.js.',
        assignedTo: user2._id,
        status: 'In Progress',
        progress: 50,
        score: 7,
      },
    ];

    await Project.insertMany(projects);
    console.log(projects)

    console.log('Seed data created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error creating seed data:', error);
    process.exit(1);
  }
};

seedData();