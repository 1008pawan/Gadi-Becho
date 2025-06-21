const {model, Schema} = require('../connection');

const adminSchema = new Schema({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true}

});

module.exports = model('admins', adminSchema);