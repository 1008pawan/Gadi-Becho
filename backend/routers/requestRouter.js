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

// Update request status
router.put('/update-status/:id', (req, res) => {
    const { status } = req.body;
    console.log('Updating request status:', req.params.id, 'to:', status);
    
    Model.findByIdAndUpdate(req.params.id, { status }, {new:true})
    .then((result) => {
        console.log('Status updated successfully:', result);
        res.status(200).json(result);
    }).catch((err) => {
        console.error('Error updating status:', err);
        res.status(500).json(err)
    });
});

// Approve request (sets status to approved and assigns vendor)
router.put('/approve/:id', (req, res) => {
    const { vendorId } = req.body;
    console.log('Approving request:', req.params.id, 'with vendor:', vendorId);
    
    const updateData = { status: 'approved' };
    if (vendorId) {
        updateData.vendorId = vendorId;
    }
    
    Model.findByIdAndUpdate(req.params.id, updateData, {new:true})
    .then((result) => {
        console.log('Request approved successfully:', result);
        res.status(200).json(result);
    }).catch((err) => {
        console.error('Error approving request:', err);
        res.status(500).json(err)
    });
});

// Complete request (sets status to completed)
router.put('/complete/:id', (req, res) => {
    const { amount, paymentId } = req.body;
    console.log('Completing request:', req.params.id, 'with amount:', amount);
    
    const updateData = { 
        status: 'completed',
        paymentCompleted: true,
        paymentDate: new Date()
    };
    
    if (amount) updateData.amount = amount;
    if (paymentId) updateData.paymentId = paymentId;
    
    Model.findByIdAndUpdate(req.params.id, updateData, {new:true})
    .then((result) => {
        console.log('Request completed successfully:', result);
        res.status(200).json(result);
    }).catch((err) => {
        console.error('Error completing request:', err);
        res.status(500).json(err)
    });
});

// Reject request (sets status to rejected)
router.put('/reject/:id', (req, res) => {
    console.log('Rejecting request:', req.params.id);
    
    Model.findByIdAndUpdate(req.params.id, { status: 'rejected' }, {new:true})
    .then((result) => {
        console.log('Request rejected successfully:', result);
        res.status(200).json(result);
    }).catch((err) => {
        console.error('Error rejecting request:', err);
        res.status(500).json(err)
    });
});

// Get requests by status
router.get('/by-status/:status', (req, res) => {
    const { status } = req.params;
    console.log('Getting requests with status:', status);
    
    Model.find({ status })
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
        console.log(err);
    });
});

// Get requests by vendor
router.get('/by-vendor/:vendorId', (req, res) => {
    const { vendorId } = req.params;
    console.log('Getting requests for vendor:', vendorId);
    
    Model.find({ vendorId })
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