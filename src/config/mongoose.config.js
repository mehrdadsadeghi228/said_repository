const { default: mongoose } = require("mongoose");
require("dotenv").config();
const tempText="Mongoose status is : "

const url = process.env.MONGODBURL;

try {
    mongoose.connect(url);
    mongoose.connection.on('connected', () => console.log(tempText,'connected'));
    mongoose.connection.on('open', () => console.log(tempText,'open'));
    mongoose.connection.on('disconnected', () => console.log(tempText,'disconnected'));
    mongoose.connection.on('reconnected', () => console.log(tempText,'reconnected'));
    mongoose.connection.on('disconnecting', () => console.log(tempText,'disconnecting'));
    mongoose.connection.on('close', () => console.log(tempText,'close'));  
} catch (error) {
    console.log("Failed DB connection to Atlas ",error);
    
}