const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {MongoClient, ServerApiVersion} = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.egsefuu.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

async function run() {
    try {
        const database = client.db("amazon");
        const collection = database.collection("products");
        const product = {
            title: "Earbuds",
            quantity: 7,
            price: 300
        };
        const result = await collection.insertOne(product);
        console.log(`Data added successfully!!!`);
    } catch {
        console.log(`Data added failed!!!`);
    } finally {
        console.log(`Let's do the next!!!`);
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is running fine!!!");
});

app.listen(port, () => {
    console.log(`Server is running on ${5000}`);
});