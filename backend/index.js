const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const requestRouter = require('./routers/requestRouter');
const vendorRouter = require('./routers/vendorRouter');
const adminRouter = require('./routers/adminRouter');
const feedbackRouter = require('./routers/feedbackRouter');
const contactUsRouter = require('./routers/contactUsRouter')

const app = express();

const PORT = 5000;

app.use(cors({
    origin:'*'
}));

app.use(express.json());
app.use('/user', userRouter);
app.use('/request', requestRouter);
app.use('/vendor', vendorRouter);
app.use('/admin', adminRouter);
app.use('/feedback', feedbackRouter);
app.use('/contactUs', contactUsRouter);

app.get('/', (req, res) => {
    res.send('Response from Express')
});

app.get('/add', (req, res) => {
    res.send('Response from Express')
});

app.listen(PORT, () => {
    console.log('Server is runing on port - ' + PORT);
});