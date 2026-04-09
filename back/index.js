const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, title: 'comprar pan', completed: true },
    { id: 2, title: 'idk', completed: true },
];

app.get('/todos', (req, res) => {
    res.json({
        status: 200,
        message: 'Todos los elementos obtenidos correctamente',
        data: todos,
    });
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todo = getTodo(id);

    if (todo) {
        res.status(200).json({ message: 'Elemento obtenido correctamente', data: todo });
    } else {
        res.status(404).json({
            status: 404,
            message: 'Elemento no encontrado',
        });
    }
});

function getTodo(id) {
    return todos.find((t) => t.id === parseInt(id));
}

app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title || title.trim() === '') {
        return res.status(400).json({
            status: 400,
            message: 'El título es requerido',
        });
    }

    const newTodo = {
        id: todos.length + 1,
        title: title.trim(),
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json({ message: 'Elemento creado correctamente', data: newTodo });

});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const todo = getTodo(id);

    if (!todo) {
        return res.status(404).json({
            status: 404,
            message: 'Elemento no encontrado',
        });
    }

    if (!title || title.trim() === '') {
        return res.status(400).json({
            status: 400,
            message: 'El título es requerido',
        });
    }

    todo.title = title.trim();
    todo.completed = completed === undefined ? todo.completed : completed;

    res.status(200).json({ message: 'Elemento actualizado correctamente', data: todo });
});

app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const todo = getTodo(id);

    if (!todo) {
        return res.status(404).json({
            status: 404,
            message: 'Elemento no encontrado',
        });
    }

    if (title !== undefined) {
        todo.title = title.trim();
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.status(200).json({ message: 'Elemento actualizado correctamente', data: todo });
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 404,
            message: 'Elemento no encontrado',
        });
    }

    const deletedTodo = todos.splice(index, 1)[0];
    res.status(204).json({ message: 'Elemento eliminado correctamente', data: deletedTodo });
});

app.get('/salud', (req, res) => {
    res.status(200).json({ status: 200, message: 'Servidor funcionando correctamente' });
});