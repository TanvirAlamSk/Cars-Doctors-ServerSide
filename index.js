const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const products = require("./data/catalog.json")

app.get("/", (req, res) => {
    res.send("Server Is Running")
})


app.get("/product", (req, res) => {
    res.send(products)

})

app.get("/product/:id", (req, res) => {
    const id = req.params.id
    const selectedItem = products.find((item) => item._id == id)
    res.send(selectedItem)

})

app.listen(port, () => {
    console.log(`Server is runnung on ${port}`)
})