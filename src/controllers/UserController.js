const userModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) =>{
    const users = await userModel.getAllUsers();

    if(users == "" || users == null){
        return res.status(200).send({message: 'Nenhum usuário encontrado'}); // Se não encontrar nenhum usuário, retorna uma mensagem e um status 200
    }
    
    res.status(200).json(users);
}

const createUser = async (req, res) =>{
    const {username, email, password} = req.body;
    try {
        const userId = await userModel.createUser({username, email, password});
        res.status(201).json({ userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const login = async (req, res) =>{
    const {email, password, is_logged} = req.body;
    const user = await userModel.login(email);

    if(!user){
        return res.status(401).
        json({ error: 'Invalid email or password' });
    }

    if(!await bcrypt.compare(password, user.password)){
        return res.status(401).
        json({ error: 'Invalid email or password' });
    }

    const userId = user.id;

    await userModel.updateIsLogged(userId, {is_logged_in: is_logged});

    // user.password = undefined;

    return res.status(200).json(user);
}

const updateUser = async (req, res) =>{
    const {userId} = req.params;
    const {username, email, password} = req.body;

    await userModel.updateUser(userId, {username, email, password});

    res.status(200).json({message: 'Usuário atualizado com sucesso'});
}

const deleteUser = async (req, res) =>{
    const {userId} = req.params;

    await userModel.deleteUser(userId);

    res.status(204).json();
}

module.exports ={
    getAllUsers,
    createUser,
    login,
    updateUser,
    deleteUser
}