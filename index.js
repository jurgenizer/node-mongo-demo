const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
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

async function getCourses() {
    // Comparison operators:
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // Logical operators:
    // or
    // and

    const courses = await Course
        // .find({author: 'Jurgen', isPublished: true})
        // .find({price: {$gte: 10, $lte: 20}})
        // .find({ price: { $in: [10, 15, 20] } })
        .find()
        .or([{author: 'Jurgen'},{isPublished: true}])
        .limit(1)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

//createCourse();

getCourses();

