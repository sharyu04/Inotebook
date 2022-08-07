const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
});

// //First argument is name of the model, here we have taken it as user
// module.exports = mongoose.model('user',UserSchema)


//To avoid repetition of same entries in the database
User = mongoose.model('user',UserSchema);
User.createIndexes();
module.exports = User;