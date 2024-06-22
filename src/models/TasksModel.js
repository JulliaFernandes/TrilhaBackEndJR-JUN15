const openDb = require('./connection');

const getAll = async (userId) => {
    const db = await openDb();
    const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    console.log(tasks);
    return tasks;
};

const createTask = async (userId, task) => {
    const { title, description } = task;

    const query = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';
    
    const db = await openDb();
    const result = await db.run(query, [title, description, userId]);
    
    return result.lastID;
};

const updateTask = async (taskId,task) => {
    const { title, description, status } = task;

    const query = 'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?';

    const db = await openDb();
    await db.run(query, [title, description, status, taskId]);
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
    deleteTask,
};


