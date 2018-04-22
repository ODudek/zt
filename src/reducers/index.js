import { combineReducers } from "redux";
import deviceReducer from "./deviceReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  devices: deviceReducer,
  modal: modalReducer
});
