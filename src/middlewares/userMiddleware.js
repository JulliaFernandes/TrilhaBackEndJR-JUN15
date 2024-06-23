const validateFields = (req, res, next) => {
    if (req.body.email === undefined || req.body.password === undefined) {
        return res.status(400).json({ message: 'The fields "email" and "password" are mandatory' });
    }

    if(req.body.email === '' || req.body.password === ''){
        return res.status(400).json({message: 'The fields "email" and "password" can not be empty'});
    }

    next();
}

module.exports = {
    validateFields,
}