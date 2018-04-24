import { LOGIN, LOGOUT } from "../actions/types";

const initialState = {
  credential: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        credential: true
      };
    case LOGOUT:
      return {
        ...state,
        credential: false
      };
  }
}
