const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        const cnn = await mongoose.connect('mongodb://localhost:27017/nodejslikedislike', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false

        })

        console.log(`mongoDB Connected Successfully ${cnn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

module.exports = ConnectDB