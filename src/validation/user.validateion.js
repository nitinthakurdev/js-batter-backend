import joi  from 'joi';


const signupSchema = joi.object().keys({
    username:joi.string().min(2).max(30).required().messages({
        'string.base': 'username must be of type string',
        'string.empty': 'username cannot be empty',
        'string.min': 'username must be at least 2 characters long',
        'string.max': 'username must be no more than 30 characters long',   
    }),
    password:joi.string().min(4).max(12).required().messages({
        'string.base': 'password must be of type string',
        'string.empty': 'password cannot be empty',
        'string.min': 'password must be at least 2 characters long',
        'string.max': 'password must be no more than 30 characters long',
    }),
    email:joi.string().email().required().messages({
        'string.base': 'email must be of type string',
        'string.empty': 'email cannot be empty',
        'string.email': 'Invalid email '
    }),
})


export {signupSchema}