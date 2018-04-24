import { combineReducers } from "redux";
import deviceReducer from "./deviceReducer";
import modalReducer from "./modalReducer";
import authReducer from "./authReducer";

export default combineReducers({
  devices: deviceReducer,
  modal: modalReducer,
  auth: authReducer
});
