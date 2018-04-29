const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Device = require("./model/devices");
const User = require("./model/users");

const app = express();
const router = express.Router();
const port = process.env.API_PORT || 3001;

mongoose.connect("mongodb://test:test123@ds055905.mlab.com:55905/zt");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

function headerSettings(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Allow", "GET,HEAD,POST,PUT,DELETE")
  res.setHeader("Cache-Control", "no-cache");
}

function addNewDevice(req, res) {
  const device = new Device();
  device.model = req.body.model;
  device.system = req.body.system;
  device.holder = req.body.holder;

  device.save(err => {
    if (err) res.send(err);
    res.json({
      message: "Dodano urządzenie"
    });
  });
}

function updateDevice(req, res) {
  if (req.params.device_id === "undefined") return;
  Device.findById(req.params.device_id, function(err, device) {
    req.body.model ? (device.model = req.body.model) : null;
    req.body.system ? (device.system = req.body.system) : null;
    req.body.holder ? (device.holder = req.body.holder) : null;
    device.save(err => {
      if (err) res.send(err);
      res.json({
        message: "Urządzenie zostało zaktualizowane"
      });
    });
  });
}

app.use((req, res, next) => {
  headerSettings(res);
  next();
});

router
  .route("/devices")
  .get((req, res) => {
    Device.find((err, devices) => {
      if (err) res.send(err);
      res.json(devices);
    });
  })
  .post(addNewDevice);

router
  .route("/devices/:device_id")
  .put(updateDevice)
  .delete((req, res) => {
    Device.remove({ _id: req.params.device_id }, err => {
      if (err) res.send(err);
      res.json({
        message: "Usunięto urządzenie"
      });
    });
  })
  .get((req, res) => {
    Device.findById(req.params.device_id, (err, device) => {
      res.json(device);
    });
  });

router.route("/auth").post((req, res) => {
  User.findOne({ login: req.body.login }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: "Nie ma takiego uzytkownika"
      });
    } else if (user) {
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: "Błędne hasło"
        });
      } else {
        res.json({
          success: true,
          message: "Zalogowano"
        });
      }
    }
  });
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Api running on port ${port}`);
});
