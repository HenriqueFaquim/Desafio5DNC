const mongoose = require('mongoose');
const handleErrors = require('../functions/handleErrors');

async function ConnectToDB(req = null, res = null, next = null) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to MongoDB!')
        try{next();} catch {};
        return mongoose;
    } catch (error) {
        console.error(error);
        handleErrors(res, 'Error: Erro ao conectar ao banco de dados.');
        return error;
    }
}

module.exports = ConnectToDB;