const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // 1 dia em segundos
    });
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();

        if (!users || users.length === 0) {
            return res.status(200).send({ message: 'There is no user register' });
        }

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userId = await userModel.createUser({ username, email, password });
        res.status(201).json({ userId });
    } catch (err) {
        res.status(500).json({ error: 'Email or username already exists' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt for email:', email);
        
        const user = await userModel.login(email);

        if (!user) {
            console.log('User not found with email:', email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Password mismatch for email:', email);
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const userId = user.id;
        console.log('User authenticated, userId:', userId);

        await userModel.updateIsLogged(userId, { is_logged_in: 1 });

        user.password = undefined;

        const token = generateToken({ id: user.id });

        console.log('Login successful for userId:', userId);
        return res.status(200).json({ user, token });
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const logout = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.is_logged_in) {
            return res.status(401).json({ error: 'User is not logged in' });
        }

        await userModel.updateIsLogged(userId, { is_logged_in: 0 });

        return res.status(200).json({ message: 'User logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await userModel.updateUser(userId, { username, email, password });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await userModel.deleteUser(userId);

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    login,
    logout,
    updateUser,
    deleteUser
}