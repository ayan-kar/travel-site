const mongodb = require("mongoose")



const listing_schema = mongodb.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        
            type: String,
        default:"https://cdn4.iconfinder.com/data/icons/hand-drawn-business-ui-pack/65/No_Image-1024.png",
        set:(v)=> v === ""? "https://cdn4.iconfinder.com/data/icons/hand-drawn-business-ui-pack/65/No_Image-1024.png" : v 
    },

    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
})

const Listing = mongodb.model("Listing", listing_schema)

module.exports = Listing