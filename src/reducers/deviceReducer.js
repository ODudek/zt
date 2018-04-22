import { FETCH_DEVICES, NEW_DEVICE } from "../actions/types";

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
    default:
      return state;
  }
}
