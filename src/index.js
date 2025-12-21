const express = require("express");
const {PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
const apiRoutes = require('../src/routes/index')

const db = require("./models/index")
const setupAndStartServer = async () => {


    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
  
    app.use('/api' ,apiRoutes);


    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        if(process.env.DB_SYNC){
           db.sequelize.sync({alter: true});
        }
       
    });
}

setupAndStartServer();