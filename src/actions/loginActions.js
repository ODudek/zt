import { LOGIN, LOGOUT } from "./types";

export const logIn = () => dispatch => {
  dispatch({
    type: LOGIN
  });
};

export const logOut = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

export const checkCredential = () => dispatch => {
    dispatch({
        type: CHECK_CREDENTIAL
    })
}