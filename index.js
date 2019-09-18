const express = require('express');

const app = express(); 

app.get('/', (req, res) => {
    res.send('hello world');
});
app.get('/api/courses', function (request, response) {
    response.send([1,2,3]);
});

app.get('/api/posts/:year/:month', function (request, response) {
    response.send(request.query);
});


//environment variable for port type
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`listening in port ${port}...`)
})