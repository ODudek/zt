import {
  FETCH_DEVICES,
  NEW_DEVICE,
  DELETE_DEVICE,
  UPDATE_DEVICE,
  GET_DEVICE,
  CLEAR_DEVICE
} from "../actions/types";

const initialState = {
  items: [],
  item: {},
  url: "http://localhost:3001/api/devices"
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEVICES:
      return {
        ...state,
        items: action.payload
      };
    case NEW_DEVICE:
      return {
        ...state,
        item: action.payload
      };
    case DELETE_DEVICE:
      return {
        ...state,
        items: action.payload,
        item: {}
      };
    case UPDATE_DEVICE:
      return {
        ...state,
        item: action.payload
      };
    case GET_DEVICE:
      return {
        ...state,
        item: action.payload
      };
    case CLEAR_DEVICE:
      return {
        ...state,
        item: action.payload
      };
    default:
      return state;
  }
}
