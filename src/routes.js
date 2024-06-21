const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/TasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

const usersController = require('./controllers/UserController');
const usersMiddleware = require('./middlewares/userMiddleware');

router.get("/tasks", tasksController.getAll);
router.post("/tasks", tasksMiddleware.validateFieldTitleDescription ,tasksController.createTask);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put("/tasks/:id", 
    tasksMiddleware.validateFieldTitleDescription,
    tasksMiddleware.validateFieldStatus,
    tasksController.updateTask
);

router.get("/users", usersController.getAllUsers);
router.post("/users", usersController.createUser);
router.put("/users/:userId", usersController.updateUser);
router.delete("/users/:userId", usersController.deleteUser);
router.post("/login", usersMiddleware.validateFields ,usersController.login);


module.exports = router;
