const express = require('express');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const Model = require('../models/requestModel');

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
        res.status(500).json(err)
        console.log(err);
        
    });
    
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err)
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


router.get('/getbyid/:id', (req, res) => {

    Model.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
        
    });
    
});

router.get('/getbycity/:city', (req, res) => {

    Model.find({city: req.params.city})
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
        
    });
    
});


router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
    .then((result) => {
        if(result){
            const {_id, name, email} = result;
            const payload = {_id, name, email};

            jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '120'}, (err, token) => {
                if(err){
                    console.log(err);
                    res.status(500).json(err);
                    
                }else{
                    res.status(200).json({token});
                }
            })
        
        }else{
            res.status(401).json({message: 'Invalid credentials'});
        }

    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
        
    });
})


module.exports = router;