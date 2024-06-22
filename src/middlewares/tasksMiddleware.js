const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function openDb() {
    return open({
        filename: process.env.SQLITE_DB_FILE || './todolist.sqlite',
        driver: sqlite3.Database
    });
}

const validateFieldTitleDescription = (req,res,next) => {
    const { body } = req;

    if(body.title === undefined || body.description === undefined){
        return res.status(400).json({message: 'The field "title" and "description" are mandatory'});
    }
    
    if(body.title === '' || body.description === ''){
        return res.status(400).json({message: 'The field "title" and "description" can not be empty'});
    }

    next();
}

const validateFieldStatus = (req,res,next) => {
    const { body } = req;

    if(body.status === undefined){
        return res.status(400).json({message: 'The field "status" are mandatory'});
    }
    
    if(body.status === ''){
        return res.status(400).json({message: 'The field "status" can not be empty'});
    }

    next();
}

const validateUserIsLogged = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const db = await openDb();
        const user = await db.get('SELECT is_logged_in FROM users WHERE id = ?', userId);
        
        console.log(user);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        else if (!user.is_logged_in) {
            return res.status(401).json({ error: 'User is not logged in' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const validateExistedTask = async (req,res,next) => {
    const { taskId } = req.params;

    if (!taskId) {
        return res.status(400).json({ error: 'Task ID is required' });
    }

    try{
        const db = await openDb();
        const task = await db.get('SELECT * FROM tasks WHERE id = ?', taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        next();
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    validateFieldTitleDescription,
    validateFieldStatus,
    validateUserIsLogged,
    validateExistedTask
};