const Joi = require('joi');
const express = require('express');
const app = express(); 

app.use(express.json());

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },
    {
        id: 3,
        name: 'course3'
    },
]

app.get('/', (req, res) => {
    res.send('hello world');
});
app.get('/api/courses', function (request, response) {
    response.send(courses);
});

//input validation
app.post('/api/courses', (request, response) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(request.body, schema);

    if (result.error) {
        // 400 bad request
        response.status(400).send(result.error.details[0].message);
        return; 
    }

    const course = {
        id: courses.length + 1,
        name: request.body.name
    };
    courses.push(course);
    response.send(course);
});

app.put('/api/courses/:id', function (request, response) {
    // Look up the course
    // if nonexistant, return 404, otherwise validate the course
    //if invalid, return 400 - Bad request

    //Update course
    //Return the updated course

    const course = courses.find(c => c.id === parseInt(request.params.id));
    if(!course) response.status(404).send('the course was not found');

    const result = validateCourse(request.body); 
    if(result, error) {
        res.status(400).send(result.error.details[0].message);
        return; 
    }
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(request.body, schema);
    if (result.error) {
        // 400 bad request
        response.status(400).send(result.error.details[0].message);
        return; 
    }

    course.name = request.body.name;
    response.send(course);
})

function validateCourse (course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}




app.get('/api/courses/:id', function (request, response) {
    const course = courses.find(c => c.id === parseInt(request.params.id));
    console.log(course)
    if(!course) response.status(404).send('the course was not found');
    response.send(course);
});


//environment variable for port type
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`listening in port ${port}...`)
})