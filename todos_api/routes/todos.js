const express = require('express');
const router = express.Router();
const db = require('../models/index');


router.get('/', (req, res) => {
    //res.send('Hello from express router')
    db.Todo.find()
        .then((todos) => {
            res.json(todos)
        })
        .catch((err) => {
            res.send(err)
        })
});


//Post 
router.post('/', (req, res) => {
    //res.send('From post route')
    //console.log(req.body)
    db.Todo.create(req.body)
        .then((newTodo) => {
            res.status(201).json(newTodo)
        })
        .catch((err) => {
            res.send(err)
        })
})

//show route
router.get('/:todoId', (req, res) => {
    db.Todo.findById(req.params.todoId)
        .then((foundTodo) => {
            res.json(foundTodo)
        })
        .catch((err) => {
            res.send(err)
        })
});

//Update route
router.put('/:todoId', (req, res) => {
    //res.send('Update route')
    db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
        .then((todo) => {
            res.json(todo)
        })
        .catch((err) => {
            res.send(err)
        })
});

//Delete route
router.delete('/:todoId', (req, res) => {
    db.Todo.remove({ _id: req.params.todoId })
        .then(() => {
            res.json({ message: 'Todo deleted!' })
        })
        .catch((err) => {
            res.send(err)
        })

})


module.exports = router;