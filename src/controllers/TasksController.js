const tasksModel = require('../models/TasksModel');
const usersModel = require('../models/UserModel');

const getAll = async (req, res) => {
    const { userId } = req.params;

    const tasks = await tasksModel.getAll(userId);

    res.status(200).json(tasks);
}

const createTask = async (req, res) => {
    const {userId} = req.params;
    const task = req.body;

    const createdTask = await tasksModel.createTask(userId, task);

    res.status(201).json({createdTask});
}

const updateTask = async (req, res) => {
    const { taskId } = req.params;

    const updatedTask = await tasksModel.updateTask(taskId, req.body);

    res.status(200).json(updatedTask);
}

const deleteTask = async (req, res) => {
    const {userId, taskId } = req.params;

    await tasksModel.deleteTask(taskId);

    res.status(204).json();
}

module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
}