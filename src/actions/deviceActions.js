import {
  FETCH_DEVICES,
  NEW_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  GET_DEVICE,
  CLEAR_DEVICE
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

export const createDevice = device => dispatch => {
  axios
    .post(DEVICE_URL, device)
    .then(res => {
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
  axios
    .put(`${DEVICE_URL}/${id}`, device)
    .then(res => {
      dispatch({
        type: UPDATE_DEVICE,
        payload: device
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const deleteDevice = (id, devices) => dispatch => {
  console.log(id);
  axios
    .delete(`${DEVICE_URL}/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_DEVICE,
        payload: devices
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const getDevice = id => dispatch => {
  axios
    .get(`${DEVICE_URL}/${id}`)
    .then(res => {
      dispatch({
        type: GET_DEVICE,
        payload: res.data
      });
    })
    .catch(err => {
      console.error(err);
    });
};

export const clearDevice = () => dispatch => {
  dispatch({
    type: CLEAR_DEVICE,
    payload: {}
  });
};
