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