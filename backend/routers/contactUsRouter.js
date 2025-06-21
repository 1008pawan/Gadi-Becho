const express = require('express');

require('dotenv').config();

const Model = require('../models/contactUsModel');

const router = express.Router();

router.get('/getall', (req, res) => {

    Model.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
        
    });
    
});

router.post('/add', (req, res) => {
    console.log(req.body);

    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
        
    });
    
});

router.delete('/delete/:id', (req, res) => {

    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
        
    });
    
});


module.exports = router;