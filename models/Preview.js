const mongoose = require("mongoose");

// Schema Design 
const previewSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true, // for removing spaces 
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too Large"],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-stock", "discountinued"],
            message: "Status can't be {VALUE}"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestams: true
})


// SCHEMA => MODEL => QUERY

previewSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

const Preview = mongoose.model("Preview", previewSchema);

module.exports = Preview;