const openDb = require('./connection');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
    try {
        const db = await openDb();
        const users = await db.all('SELECT * FROM users');
        return users;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error('Error fetching all users');
    }
};

const createUser = async (user) => {
    const { username, email, password } = user;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        const db = await openDb();
        const result = await db.run(query, [username, email, hashedPassword]);
        return result.lastID;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
};

const login = async (email) => {
    try {
        const db = await openDb();
        const query = 'SELECT * FROM users WHERE email = ?';
        const user = await db.get(query, [email]);
        return user;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Error logging in user');
    }
};

const getUserById = async (userId) => {
    try {
        const db = await openDb();
        return await db.get('SELECT * FROM users WHERE id = ?', userId);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Error fetching user by ID');
    }
};

const updateIsLogged = async (userId, user) => {
    try {
        const db = await openDb();
        const query = 'UPDATE users SET is_logged_in = ? WHERE id = ?';
        await db.run(query, [user.is_logged_in, userId]);
    } catch (error) {
        console.error('Error updating user logged status:', error);
        throw new Error('Error updating user logged status');
    }
};

const updateUser = async (userId, user) => {
    const { username, email, password } = user;

    try {
        const db = await openDb();
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
        await db.run(query, [username, email, hashedPassword, userId]);
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Error updating user');
    }
};

const deleteUser = async (userId) => {
    try {
        const db = await openDb();
        const query = 'DELETE FROM users WHERE id = ?';
        await db.run(query, [userId]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
};

module.exports = {
    getAllUsers,
    createUser,
    login,
    getUserById,
    updateIsLogged,
    updateUser,
    deleteUser
};
