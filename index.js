const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
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
       // name: 'The JavaScript Good Bits Course',
        author: 'Jurgen',
        tags: ['JavaScript', 'beginner'],
        isPublished: true
    });

    try {
        const result = await course.save();
        console.log(result);
       
    }
    catch(ex) {
        console.log(ex.message);
    }


}

createCourse();

async function updateCourse(id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'Onelove',
            isPublished: false
        }
    });
    console.log(result);
}

//updateCourse('66ffff324a022b14c77266b9');

async function removeCourse(id) {
const result = await Course.deleteOne({_id: id})
console.log(result);
}

//removeCourse('66ffff324a022b14c77266b9');

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

    const pageNumber = 2;
    const pageSize = 10;

    // /api/courses?pageNumber=2&pageSize=10;

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        // .skip((pageNumber - 1) * pageSize)
        // .find({price: {$gte: 10, $lte: 20}})
        // .find({ price: { $in: [10, 15, 20] } })
        //.find({author: /^Jur/}) // Regex for starts with Jur
        //.find({author: /Geitner$/}) // Regex for ends with Geitner (case-sensitive)
        //.find({author: /Geitner$/i}) // Regex for ends with Geitner (case-insensitive)
        //.find({author: /.*Jurgen.*/}) // Regex for contains word Jurgen 
        // .or([{author: 'Jurgen'},{isPublished: true}])
        // .limit(pageSize)
        .sort({ name: 1 })
    //.select({ name: 1, tags: 1 });
    //.countDocuments();

    console.log(courses);
}



//getCourses();

