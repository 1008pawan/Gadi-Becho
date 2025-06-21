const { Schema, model } = require('../connection');


const feedbackSchema = new Schema({
    name: String,
    email: {type: String, unique:true},
    message: {type: String, require:true}
});


module.exports = model('feedbacks', feedbackSchema);