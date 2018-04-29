import {
  FETCH_DEVICES,
  NEW_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  GET_DEVICE,
  CLEAR_DEVICE
} from "./types";
import API from "../modules/api";
const DEVICE_URL = "http://localhost:3001/api/devices";

export const fetchDevices = () => dispatch => {
  API.GET(DEVICE_URL, devices => {
    dispatch({
      type: FETCH_DEVICES,
      payload: devices.data
    });
  });
};

export const createDevice = device => dispatch => {
  API.POST(DEVICE_URL, device, res => {
    dispatch({
      type: NEW_DEVICE,
      payload: device
    });
  });
};

export const updateDevice = (id, device) => dispatch => {
  let url = `${DEVICE_URL}/${id}`;
  API.PUT(
    url,
    device,
    dispatch({
      type: UPDATE_DEVICE,
      payload: device
    })
  );
};

export const deleteDevice = (id, devices) => dispatch => {
  let url = `${DEVICE_URL}/${id}`;
  API.DELETE(url, res => {
    dispatch({
      type: DELETE_DEVICE,
      payload: devices
    });
  });
};

export const getDevice = id => dispatch => {
  let url = `${DEVICE_URL}/${id}`;
  API.GET(url, res => {
    dispatch({
      type: GET_DEVICE,
      payload: res.data
    });
  });
};

export const clearDevice = () => dispatch => {
  dispatch({
    type: CLEAR_DEVICE,
    payload: {}
  });
};
