const { Schema, model } = require('../connection');


const vendorSchema = new Schema({
    vendorId: { type: Schema.Types.ObjectId, ref: "vendors"},
    name: String,
    email: {type: String, unique:true},
    location: {type: String, required:true},
    password: {type: String, required:true},
    createdAt: {type:Date, default: Date.now}
});


module.exports = model('vendors', vendorSchema);