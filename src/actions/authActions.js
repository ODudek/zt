import { LOGIN, LOGOUT } from "./types";
import axios from "axios";

const AUTH_URL = "http://localhost:3001/api/auth";

export const logIn = login => dispatch => {
  if (login === undefined) {
    dispatch({
      type: LOGIN
    });
  } else {
    axios.post(AUTH_URL, login).then(res => {
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
