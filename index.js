const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// Compile schema into a model
// PascalCase to name our classes, e.g., Course
const Course = mongoose.model('Course', courseSchema);
// camelCase to name our obbjects, e.g., course
const course = new Course({
    name: 'Node.js Course',
    author: 'Jurgen',
    tags: ['node', 'backend'],
    isPublished: true
})