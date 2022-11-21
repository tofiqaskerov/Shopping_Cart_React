const express = require("express")
const cors = require("cors")
const products = require("./data/product")

const app = express()

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.send("Welcome to our online shop API...")
})

app.get("/products", (req, res) => {
    res.send(
        products   // data olaraq product.js de yaratdigim obyekleri getirdim
    )
})

const port = process.env.PORT || 5000

app.listen(5000, console.log(`Server running on port ${port}`))  // localhost:5000 de  datalarim gorsenecek