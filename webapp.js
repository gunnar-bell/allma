// const path = require('path');
const express = require('express')
const app = express()
const port = 3000
const host = '0.0.0.0'

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.status(200).send('hello world');
});

// app.get('/tasks', function(req, res) {
//     res.sendFile(path.join(__dirname + '/tasks.html'));
// });

app.listen(port, host, () => console.log(`Example app listening on port ${port}!`))
