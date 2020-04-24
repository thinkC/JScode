$(document).ready(() => {
    $.getJSON('/api/todos')
        .then(addTodos)
        .catch((err) => {
            console.log(err)
        });

    $('#todoInput').keypress((event) => {
        if (event.which == 13) {
            //console.log('You hit enter key')
            createTodo();
        }
    });



    $('.list').on('click', 'span', function () {
        removeTodo($(this).parent());
    })
})

const addTodos = (todos) => {
    //add todos to page here
    //console.log(todos);
    todos.forEach(todo => {
        //console.log(todo.name)
        addTodo(todo)

    });
};

//add single todo
const addTodo = (todo) => {
    let newTodo = $('<li class="task">' + todo.name + '<span>x</span>' + ' </li>');
    //newTodo.data('id', 1)
    newTodo.data('id', todo._id);
    if (todo.completed) {
        newTodo.addClass('done')
    }
    $('.list').append(newTodo)
}

const createTodo = () => {
    //send request to create new todo
    let usrInput = $('#todoInput').val();
    //console.log(usrInput);
    $.post('/api/todos', { name: usrInput })
        .then((newTodo) => {
            console.log(newTodo);
            $('#todoInput').val('');
            addTodo(newTodo)
        })
        .catch((err) => {
            console.log(err)
        });


}

const removeTodo = (todo) => {
    let clickedId = todo.parent().data('id');
    $.ajax({
        method: 'DELETE',
        url: '/api/todos/' + clickedId
    })
        .then((data) => {
            //console.log(data)
            todo.remove()
        })
        .catch((err) => {
            console.log(err)
        })
}