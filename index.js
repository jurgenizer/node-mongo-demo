const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground' , {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
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


async function createCourse() {
    // camelCase to name our obbjects, e.g., course
const course = new Course({
    name: 'JavaScript Course',
    author: 'Jurgen',
    tags: ['JavaScript', 'beginner'],
    isPublished: true
});

const result = await course.save();
console.log(result);
}

createCourse();

