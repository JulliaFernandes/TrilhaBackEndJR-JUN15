const tasksModel = require('../models/TasksModel');

const getAll = async (req, res) => {
    const { userId } = req.params;

    try {
        const tasks = await tasksModel.getAll(userId);

        if(tasks.length === 0) {
            return res.status(404).json({ error: 'You dont have any tasks yet' });
        }
        else {
            return res.status(200).json(tasks);
        }

    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

const createTask = async (req, res) => {
    const { userId } = req.params;
    const task = req.body;

    try {
        const taskID = await tasksModel.createTask(userId, task);
        res.status(201).json({ message: 'Task created successfully', taskID});
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const updatedTask = await tasksModel.updateTask(taskId, req.body);
        res.status(200).json({ message: 'Task updated successfully', updatedTask});
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        await tasksModel.deleteTask(taskId);
        res.status(200).json({ message: 'Task deleted successfully'});
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
};
