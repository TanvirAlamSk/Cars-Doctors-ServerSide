const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())


console.log(process.env.DB_USER)

const products = require("./data/catalog.json")
const services = require("./data/services.json")

app.get("/", (req, res) => {
    res.send("Server Is Running")
})



//--------------------------data base-------------------------------


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7xhaxuz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const user = {
    name: "tanvir",
    department: "CSE"
}

async function run() {
    try {
        // const productCollection = client.db("Product").collection("Items")
        const productCollection = client.db("car-doctor").collection("product")
        const serviceCollection = client.db("car-doctor").collection("service")


        app.get("/products", async (req, res) => {
            const query = {}
            const productfromdb = await productCollection.find(query)
            const allproduct = await productfromdb.toArray()
            res.send(allproduct)

        })

        app.post("/products", async (req, res) => {
            const result = await productCollection.insertOne(user)
            console.log(result)
        })

    } finally {



    }
}
run().catch(console.dir);
//--------------------------data base-------------------------------







app.get("/product", (req, res) => {
    res.send(products)

})

app.get("/product/:id", (req, res) => {
    const id = req.params.id
    const selectedItem = products.find((item) => item._id == id)
    res.send(selectedItem)

})
app.get("/service/:id", (req, res) => {
    const id = req.params.id;
    const selectedService = services.find((service) => service._id == id);
    res.send(selectedService);

})

app.listen(port, () => {
    console.log(`Server is runnung on ${port}`)
})