const express = require("express")
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())


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


async function run() {
    try {
        const productCollection = client.db("car-doctor").collection("products")
        const productOrderCollection = client.db("car-doctor").collection("productsOrder")
        const serviceCollection = client.db("car-doctor").collection("services")
        const servicePurchaseCollection = client.db("car-doctor").collection("servicesPurchase")



        // -----------------------service-------------------------------
        app.get("/services", async (req, res) => {
            const query = {}
            const servicefromdb = serviceCollection.find(query)
            const allservice = await servicefromdb.toArray()
            res.send(allservice)

        })

        app.get("/service/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const selectedService = await serviceCollection.findOne(query);
            res.send(selectedService);

        })

        app.post("/service/:id", async (req, res) => {
            const servicePuschase = req.body
            const result = await servicePurchaseCollection.insertOne(servicePuschase)
            res.send(result)
        })

        app.get("/services/order", async (req, res) => {
            const query = { email: req.query.email };
            const servicesOrder = servicePurchaseCollection.find(query);
            const allOrders = await servicesOrder.toArray(query);
            res.send(allOrders)
        })

        // -----------------------product-------------------------------

        app.get("/products", async (req, res) => {
            const query = {}
            const productfromdb = productCollection.find(query)
            const allproduct = await productfromdb.toArray()
            res.send(allproduct)

        })


        app.get("/product/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const selectedItem = await productCollection.findOne(query)
            res.send(selectedItem)

        })
        app.post("/product/:id", async (req, res) => {
            const order = req.body
            const result = await productOrderCollection.insertOne(order)
            res.send(result)

        })

        app.get("/products/order", async (req, res) => {
            const query = { email: req.query.email };
            const productsOrder = productOrderCollection.find(query);
            const allOrders = await productsOrder.toArray(query);
            res.send(allOrders)
        })

        // -------------------------

    } finally {



    }
}
run().catch(console.dir);
//--------------------------data base-------------------------------

app.listen(port, () => {
    console.log(`Server is runnung on ${port}`)
})