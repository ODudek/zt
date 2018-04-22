import {
  FETCH_DEVICES,
  NEW_DEVICE,
  UPDATE_DEVICE,
  GET_DEVICE,
  DELETE_DEVICE
} from "./types";
import axios from "axios";

const DEVICE_URL = "http://localhost:3001/api/devices";

export const fetchDevices = () => dispatch => {
  axios.get(DEVICE_URL).then(devices => {
    dispatch({
      type: FETCH_DEVICES,
      payload: devices.data
    });
  });
};

export const newDevice = device => dispatch => {
  axios
    .post(DEVICE_URL, device)
    .then(res => {
      console.log(device);
      dispatch({
        type: NEW_DEVICE,
        payload: device
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const updateDevice = (id, device) => dispatch => {
  axios.put(`${DEVICE_URL}/${id}`, device).catch(err => {
    console.error(err);
  });
};

export const deleteDevice = (id, devices) => dispatch => {
  axios
    .delete(`${DEVICE_URL}/${id}`)
    .then(
      devices.forEach(device => {
        if (device._id === id) {
          let index = devices.indexOf(device);
          devices.splice(index, 1);
        }
      })
    )
    .catch(err => {
      console.error(err);
    });
};
