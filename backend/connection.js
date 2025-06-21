const mongoose = require('mongoose');

require('dotenv').config();

const url = process.env.DB_URL;

mongoose.connect(url)

.then((result) => {
    console.log('Connected to mongoDB');
    
}).catch((err) => {
    console.log('Error Connected to mongoDB is:', err);
    
});

module.exports = mongoose;