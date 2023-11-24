const mongoose = require('mongoose');

const dbConnect = async (uri) => {
    try {
        const conn = await mongoose.connect(uri, {
            dbName: 'movies'
        });
        console.log(`MongoDB successfully connected on port: ${conn.connection.port}`)
    } catch (error) {
        console.log(error.message);
    };
};

module.exports = dbConnect;