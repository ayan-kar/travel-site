
const intidata=require("./data")
const Listing=require("../model/place_listing")


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

const initDB=async () => {
    await Listing.deleteMany({})
    await Listing.insertMany(intidata.data)
    console.log("data was initalized")
}
initDB()