const validateFields = (req, res, next) => {
    if (req.body.email === undefined || req.body.password === undefined || req.body.is_logged === undefined) {
        return res.status(400).json({ message: 'The fields "email", "password" and "is_logged" are mandatory' });
    }

    if(req.body.email === '' || req.body.password === '' || req.body.is_logged === ''){
        return res.status(400).json({message: 'The fields "email", "password" and "is_logged" can not be empty'});
    }

    next();
}

module.exports = {
    validateFields,
}