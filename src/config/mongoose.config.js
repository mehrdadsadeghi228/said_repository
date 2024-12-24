const { default: mongoose } = require("mongoose");
require("dotenv").config();
const tempText="Mongoose status is : "
const monogourl="mongodb://root:1ghLoIcLjglaKTKEk6Kk554I@said:27017/my-app?authSource=admin";
try {
    mongoose.connect(monogourl);
    mongoose.connection.on('connected', () => console.log(tempText,'connected'));
    mongoose.connection.on('open', () => console.log(tempText,'open'));
    mongoose.connection.on('disconnected', () => console.log(tempText,'disconnected'));
    mongoose.connection.on('reconnected', () => console.log(tempText,'reconnected'));
    mongoose.connection.on('disconnecting', () => console.log(tempText,'disconnecting'));
    mongoose.connection.on('close', () => console.log(tempText,'close'));  
} catch (error) {
    console.log("Failed DB connection to Atlas ",error);
    
}