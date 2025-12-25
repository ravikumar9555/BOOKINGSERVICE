const express = require("express");
const {PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
const apiRoutes = require('../src/routes/index')
//const {BookingService} = require('../src/services/index')
const db = require("./models/index")
const setupAndStartServer = async () => {
const {FLIGHT_SERVICE_PATH} = require('../src/config/serverConfig')

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
  
    app.use('/api' ,apiRoutes);


    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        //console.log(FLIGHT_SERVICE_PATH)
        if(process.env.DB_SYNC){
           db.sequelize.sync({alter: true});
        }
       
    });
}

setupAndStartServer();