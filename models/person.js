const mongoose = require('mongoose');

// Define the person schema

const personSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String
        
        
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }

})

// create person model

const person = mongoose.model('person',personSchema);
module.exports = person