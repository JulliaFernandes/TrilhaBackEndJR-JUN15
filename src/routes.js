const express = require('express');

const router = express.Router();

const tasksController = require('./controllers/TasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

const usersController = require('./controllers/UserController');
const usersMiddleware = require('./middlewares/userMiddleware');

router.get("/users/:userId/tasks",
    tasksMiddleware.validateUserIsLogged,
    tasksController.getAll
);
router.post("/users/:userId/tasks", 
    tasksMiddleware.validateUserIsLogged,
    tasksMiddleware.validateFieldTitleDescription,
    tasksController.createTask
);
router.delete("/users/:userId/tasks/:taskId",
    tasksMiddleware.validateUserIsLogged,
    tasksMiddleware.validateExistedTask,
    tasksController.deleteTask
);
router.put("/users/:userId/tasks/:taskId", 
    tasksMiddleware.validateUserIsLogged,
    tasksMiddleware.validateExistedTask,
    tasksMiddleware.validateFieldTitleDescription,
    tasksMiddleware.validateFieldStatus,
    tasksController.updateTask
);

router.get("/users", usersController.getAllUsers);
router.post("/users", usersController.createUser);
router.put("/users/:userId", usersController.updateUser);
router.delete("/users/:userId", usersController.deleteUser);
router.post("/users/login", usersMiddleware.validateFields ,usersController.login);


module.exports = router;
