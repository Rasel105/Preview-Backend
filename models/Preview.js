const mongoose = require("mongoose");

// email Validation  
const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

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
    age: {
        type: Number,
        required: true,
        min: [0, "Age can't be negative"],
    },
    phone: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Published", "Not-Published"],
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