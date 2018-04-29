import { LOGIN, LOGOUT } from "./types";
import API from "../modules/api";
const AUTH_URL = "http://localhost:3001/api/auth";

export const logIn = login => dispatch => {
  if (login === undefined) {
    dispatch({
      type: LOGIN
    });
  } else {
    API.POST(AUTH_URL, login, res => {
      if (res.data.success) {
        dispatch({
          type: LOGIN
        });
      } else {
        dispatch({
          type: LOGOUT
        });
      }
    });
  }
};

export const logOut = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};


