const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Device = require('./model/devices');

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://adudek3:Olek.dudek1@ds055905.mlab.com:55905/zt')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
    res.setHeader('Cache-Control', 'no-cache');
    next();
})

router.get('/', (req, res) => {
    res.json({
        message: 'API Initialized!'
    });
});

router.route('/devices')
    .get((req, res) => {
        Device.find((err, devices) => {
            if (err)
                res.send(err)
            res.json(devices)
        });
    })
    .post((req, res) => {
        const device = new Device();
        device.model = req.body.model;
        device.system = req.body.system;
        device.available = req.body.available;
        device.holder = req.body.holder;        

        device.save((err) => {
            if (err)
                res.send(err)
                res.json({
                    message: 'Comment successfully added!'
                })
        })
    })

router.route('/devices/:device_id')
    .put((req, res) =>{
        if(req.params.device_id === 'undefined')
        return;
        Device.findById(req.params.device_id, function(err, device){
            (req.body.model) ? device.model = req.body.model : null;
            (req.body.system) ? device.system = req.body.system : null;            
            (req.body.available) ? device.available = req.body.available : null;            
            (req.body.holder) ? device.holder = req.body.holder : null; 
            device.save((err) =>{
                if (err)
                res.send(err);
                res.json({ message: 'Device has been updated'});
            })
        })
    })
    .delete((req, res) =>{
        Device.remove({ _id: req.params.device_id }, (err) => {
            if(err)
            res.send(err)
            res.json({ message: 'Device has been deleted' })
        })
    })
app.use('/api', router);

app.listen(port, () => {
    console.log(`Api running on port ${port}`);
})