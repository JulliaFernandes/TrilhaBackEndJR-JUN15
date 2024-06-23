const openDb = require('./connection');
const bcrypt = require('bcrypt');

const getAllUsers = async () =>{
    const db = await openDb();
    const users = await db.all('SELECT * FROM users');
    return users;
}

const createUser = async (user)=>{
    const {username, email, password} = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    const db = await openDb();

    const result = await db.run(query, [username, email, hashedPassword]);
    return result.lastID;
}

const login = async (email) =>{
    const db = await openDb();
    const query = 'SELECT * FROM users WHERE email = ?';
    const user = await db.get(query, [email]);
    return user;
}

const getUserById = async (userId) => {
    const db = await openDb();
    return db.get('SELECT * FROM users WHERE id = ?', userId);
}

const updateIsLogged = async (userId, user) =>{
    const db = await openDb();
    const query = 'UPDATE users SET is_logged_in = ? WHERE id = ?';
    await db.run(query, [user.is_logged_in, userId]);
}

const updateUser = async (userId,user) =>{
    const {username, email, password} = user;
    const db = await openDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    await db.run(query, [username, email, hashedPassword, userId]);
}

const deleteUser = async (userId) =>{
    const db = await openDb();
    const query = 'DELETE FROM users WHERE id = ?';
    await db.run(query, [userId]);
}






module.exports = {
    getAllUsers,
    createUser,
    login,
    getUserById,
    updateIsLogged,
    updateUser,
    deleteUser
}




