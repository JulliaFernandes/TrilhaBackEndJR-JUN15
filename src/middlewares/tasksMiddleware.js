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

module.exports = {
    validateFieldTitleDescription,
    validateFieldStatus
};