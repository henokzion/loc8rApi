var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost/Loc8rApi';
mongoose.connect(dbURI);

mongoose.connection.on('connected', ()=>{
    console.log("mongoose connected to "+ dbURI);
});

mongoose.connection.on('error', (err)=>{
    console.log("Mongoose connection error");
});

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose disconnected');
});

var gracefulShutdown = (msg, callback)=>{
    mongoose.connection.close(()=>{
        console.log('mongoose disconnected through '+ msg);
    });
};


//hanling graceful shutdown for nodemon
process.once('SIGUSR2', ()=>{
    gracefulShutdown('nodemon restart', ()=>{
        process.kill(process.pid, 'SIGUSR2');
    });
});

// handling process termination for local env(unix)
process.once('SIGINT', ()=>{
    gracefulShutdown('app termination', ()=>{
        process.exit(0);
    });
});

//handling process termination for heroku
process.once('SIGTERM', ()=>{
    gracefulShutdown('Heroku app shutdown', ()=>{
        process.exit(0);
    });
});

//requiring schema definations
require('./locations.js');