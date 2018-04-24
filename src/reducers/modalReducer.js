import { SHOW_MODAL, HIDE_MODAL,MODAL_ADD,MODAL_UPDATE } from "../actions/types";

const initialState = {
  isOpen: false,
  isUpdate: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isOpen: true
      };
    case HIDE_MODAL:
      return {
        ...state,
        isOpen: false
      };
    case MODAL_UPDATE:
      return {
        ...state,
        isUpdate: true
      };
    case MODAL_ADD:
      return {
        ...state,
        isUpdate: false
      };
    default:
      return state;
  }
}
