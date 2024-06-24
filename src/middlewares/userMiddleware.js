const sqlite3 = require('sqlite3').verbose();
const e = require('express');
const { open } = require('sqlite');

async function openDb() {
    return open({
        filename: process.env.SQLITE_DB_FILE || './todolist.sqlite',
        driver: sqlite3.Database
    });
}

const validateFields = (req, res, next) => {
    const { email, password } = req.body;

    if (email === undefined || password === undefined) {
        return res.status(400).json({ message: 'The fields "email" and "password" are mandatory' });
    }

    if (email === '' || password === '') {
        return res.status(400).json({ message: 'The fields "email" and "password" cannot be empty' });
    }

    next();
};

const validateUserIsLogged = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        const db = await openDb();
        const user = await db.get('SELECT is_logged_in FROM users WHERE id = ?', userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.is_logged_in) {
            return res.status(401).json({ error: 'User is not logged in' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const validateExistedEmail = async (req, res, next) => {
    const { email } = req.body;
    const { userId } = req.params;

    try {
        const db = await openDb();
        const user = await db.get('SELECT * FROM users WHERE email = ?', email);

        if (!user || (user.id == userId)) {
            return next();
        } else {
            return res.status(409).json({ error: 'Email already registered' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const validateExistedUser = async (req, res, next) => {
    const { username } = req.body;
    const { userId } = req.params;

    try {
        const db = await openDb();
        const user = await db.get('SELECT * FROM users WHERE username = ?', username);

        // Se o usuário não existe OU se o usuário existe e é o mesmo do userId (edição)
        if (!user || (user.id == userId)) {
            return next();
        } else {
            return res.status(409).json({ error: 'Username already registered' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    validateFields,
    validateUserIsLogged,
    validateExistedEmail,
    validateExistedUser
}
