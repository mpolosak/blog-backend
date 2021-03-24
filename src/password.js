const passwordValidator = require('password-validator');

let schema = new passwordValidator();

schema
.is().min(8)
.is().max(32)
.has().lowercase()
.has().uppercase()
.has().digits()

const errorMessages = {
    'min': "Password too short",
    'max': "Password too long",
    'lowercase': "Password should contain minimum one lowercase letter",
    'uppercase': 'Password should contain minimum one uppercase letter',
    'digits': 'Password should contain minimum one digit'
}

const checkPassword = (password) => {
    const list = schema.validate(password, { list: true });
    const errorList = list.map(
        element => errorMessages[element]
    )
    const errorMessage = errorList.join(';')
    if(errorMessage)
        throw Error(errorMessage)
}

exports.checkPassword = checkPassword