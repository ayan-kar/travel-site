const express = require("express")
const app = express()
const port = 3500

const methodOverride = require("method-override")
const path = require("path")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

app.listen(port, () => {
    console.log("server done")
})