
const mongoose = require('mongoose');
const uri = "mongodb+srv://<mehrdad>:<SppOWgICvzRlwUWW>@group.7q9za.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const url = "mongodb+srv://mehrdadsadeghi769:SppOWgICvzRlwUWW@group.1jfgt.mongodb.net/?retryWrites=true&w=majority&appName=group";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const monogourl ="mongodb://root:1ghLoIcLjglaKTKEk6Kk554I@makalu.liara.cloud:31185/my-app?authSource=admin";

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(monogourl, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
