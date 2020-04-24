const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.Promise = global.Promise;
//mongoose.set('useFindAndModify', false);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to local mongoose DB...')
})

module.exports.Todo = require('./todo');