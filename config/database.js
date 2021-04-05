const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'./config/config.env'});

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useCreateIndex',true);


class Database {
    constructor() {
        this.connect();
    }

    connect() {
        const DatabaseAPI = process.env.MONGO_API;

        // Set database connection
        mongoose.connect(DatabaseAPI)
            .then(() => {
                console.log("database connection successfull")
            })
            .catch((err) => {
                console.log("database connection error " + err)
            })

    }


}

module.exports = new Database();
