const connection = require('./connection');

const getAll = async () => {
    const db = await openDb();
    const tasks = await db.all('SELECT * FROM tasks');
    return tasks;
};

const createTask = async (task) => {
    const { title, description } = task;

    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    
    const db = await openDb();
    const result = await db.run(query, [title, description]);
    
    return result.lastID;
};

const updateTask = async (id,task) => {
    const { title, description, status } = task;

    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';

    const db = await openDb();
    await db.run(query, [title, description, status, id]);
};

const deleteTask = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    
    const db = await openDb();
    await db.run(query, [id]);
};

module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
};


