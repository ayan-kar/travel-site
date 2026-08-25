const express = require("express")
const app = express()
const port = 3500

const ejsMate=require("ejs-mate")
app.engine("ejs",ejsMate)
const database_url = "mongodb://127.0.0.1:27017/wanderlust"
const mongodb = require("mongoose")
async function main() {
    await mongodb.connect(database_url)
}
main().then((res) => {
    console.log("database done")
})
    .catch((err) => {
        console.log("database,its over bro")
    })
const Listing = require("./model/place_listing")


const methodOverride = require("method-override")
const path = require("path")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))

// app.get("/test",async (req,result)=>{
//  let new_listing=new Listing({
//     title:"My Home",
//     description:"by teh beach",
//     price:12000,
//     location:"WB",
//     county:"india"
//  })
//  new_listing.save().then((res)=>{
//     result.send("saved",res)
//  }).catch((err)=>{
//     result.send(err)
//  })
// })
app.get("/listings/new", (req, res) => {
    res.render("listings/form.ejs")

})
app.post("/listings", async (req, res) => {
    let listing = req.body;
    // // console.log(listing)
    const new_listing = new Listing(listing);
    await new_listing.save();
    res.redirect("/listings")
})
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    let result = await Listing.findById(id)
    res.render("listings/editform.ejs", { result })
})

//$ update route
app.patch("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let listing = req.body;
    let result = await Listing.findByIdAndUpdate(id,{...listing});
    res.redirect("/listings")
})

app.delete("/listings/:id",async (req,res)=>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
     res.redirect("/listings");

})


//* shwoimg particullar
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    // console.log(id, typeof (id))
    let result = await Listing.findById(id)
    res.render("listings/show.ejs", { result })
})



//* showing all
app.get("/listings", async (req, res) => {
    Listing.find({}).then((result) => {
        res.render("listings/index.ejs", { result })
    })
        .catch((err) => {
            res.send("some error while fetching database", err)
        })
})
app.get("/",(req,res)=>{
    res.send("i am root bro")
})

app.listen(port, () => {
    console.log("server done")
})