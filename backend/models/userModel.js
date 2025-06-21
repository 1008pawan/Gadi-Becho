const { Schema, model } = require('../connection');


const userSchema = new Schema({
    name: String,
    email: {type: String, unique:true},
    city: {type: String, required:true},
    password: {type: String, required:true},
    createdAt: {type:Date, default: Date.now}
});


module.exports = model('users', userSchema);