const { Schema, model } = require('../connection');


const messageSchema = new Schema({
    name: String,
    email: {type: String, unique:true},
    message: {type: String, require:true}
});


module.exports = model('messages', messageSchema);