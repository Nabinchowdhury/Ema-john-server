const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.l3ookfm.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {
        const productsCollection = client.db("Ema-John").collection("products")

        app.get('/products', async (req, res) => {
            query = {}
            const cursor = productsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        // app.post("/product", async (req, res) => {
        //     const product = { name: "shirt" }
        //     const result = await productsCollection.insertOne(product)
        //     console.log(result)
        // })
    } finally {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("Ema-johm server is running")
})
app.listen(port, () => {
    console.log(`server is running o port ${port}`)
})
