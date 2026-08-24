const express = require("express")
const app = express()
const port = 3500

const database_url="mongodb://127.0.0.1:27017/wanderlust"
const mongodb=require("mongoose")
async function main() {
  await  mongodb.connect(database_url)
}
main().then((res)=>{
    console.log("database done")
})
.catch((err)=>{
    console.log("database,its over bro")
})
const Listing=require("./model/place_listing")


const methodOverride = require("method-override")
const path = require("path")


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

app.get("/test",async (req,result)=>{
 let new_listing=new Listing({
    title:"My Home",
    description:"by teh beach",
    price:12000,
    location:"WB",
    county:"india"
 })
 new_listing.save().then((res)=>{
    result.send("saved",res)
 }).catch((err)=>{
    result.send(err)
 })
})
app.listen(port, () => {
    console.log("server done")
})