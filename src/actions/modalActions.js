import { SHOW_MODAL, HIDE_MODAL } from "./types";

export const showModal = () => dispatch => {
    console.log('otwarcie')
  dispatch({
    type: SHOW_MODAL
  });
};

export const hideModal = () => dispatch => {
    console.log('zamkniecie')
  dispatch({
    type: HIDE_MODAL
  });
};
