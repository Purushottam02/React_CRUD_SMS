import { ActionTypes } from "../constants/action-types";
const intialState = {
  loginDetails: {
    username: "",
    password: "",
  },
  registrationDetails: {
    username: "",
    email: "",
    password: "",
  },
};

export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_LOGIN_DETAILS:
      return { ...state, loginDetails: payload };
    case ActionTypes.SET_REGISTRATION_DETAILS:
      return { ...state, registrationDetails: payload };
    default:
      return state;
  }
};
