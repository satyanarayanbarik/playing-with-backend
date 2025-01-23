const mongoose = require('mongoose')

async function connectToMongoDB(url){
    return MongooseError.connect(url);
}

module.exports = {
    connectToMongoDB, 
}