const openDb = require('./connection');

const getAll = async (userId) => {
    try {
        const db = await openDb();
        const tasks = await db.all('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Error fetching tasks');
    }
};

const createTask = async (userId, task) => {
    const { title, description } = task;
    const query = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';

    try {
        const db = await openDb();
        const result = await db.run(query, [title, description, userId]);
        return result.lastID;
    } catch (error) {
        console.error('Error creating task:', error);
        throw new Error('Error creating task');
    }
};

const updateTask = async (taskId, task) => {
    const { title, description, status } = task;
    const query = 'UPDATE tasks SET title = ?, description = ?, status = ?, updated_at = ? WHERE id = ?';

    try {
        const db = await openDb();
        const updatedAt = new Date().toISOString(); // Formata a data para o padrão ISO 8601
        await db.run(query, [title, description, status, updatedAt, taskId]);
        return task;
    } catch (error) {
        console.error('Error updating task:', error);
        throw new Error('Error updating task');
    }
};


const deleteTask = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?';

    try {
        const db = await openDb();
        await db.run(query, [id]);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw new Error('Error deleting task');
    }
};

module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask,
};
