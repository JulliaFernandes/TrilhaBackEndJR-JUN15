const tasksModel = require('../models/TasksModel');

const getAll = async (req, res) => {
    const tasks = await tasksModel.getAll();

    res.status(200).json(tasks);
}

const createTask = async (req, res) => {
    const createdTask = await tasksModel.createTask(req.body);

    res.status(201).json(createdTask);
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = await tasksModel.updateTask(id, req.body);

    res.status(200).json(updatedTask);
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    await tasksModel.deleteTask(id);

    res.status(204).json();
}

module.exports = {
    getAll,
    createTask,
    updateTask,
    deleteTask
}