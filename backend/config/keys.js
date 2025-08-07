const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    MongoURI: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.4rzjzfg.mongodb.net/busbooking?retryWrites=true&w=majority&appName=Cluster0`
}