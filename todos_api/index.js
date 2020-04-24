const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const todoRoute = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.use('/api/todos', todoRoute)

app.get('/', (req, res) => {
    //res.send('Hello from root route');
    res.sendFile('index.html')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server started on port 3000...')
})