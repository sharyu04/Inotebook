const mongoose = require('mongoose')

const NotesSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    disctiption : {
        type : String,
        required : true,
    },
    tag : {
        type : String,
        default : "General"
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
});

//First argument is name of the model, here we have taken it as user
module.exports = mongoose.model('notes',NotesSchema)