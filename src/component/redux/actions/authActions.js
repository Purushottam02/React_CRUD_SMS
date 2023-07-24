import { ActionTypes } from "../constants/action-types";

export const setLoginDetails = (loginDetails) => {
  return {
    type: ActionTypes.SET_LOGIN_DETAILS,
    payload: loginDetails,
  };
};

export const setRegistrationDetails = (registrationDetails) => {
  return {
    type: ActionTypes.SET_REGISTRATION_DETAILS,
    payload: registrationDetails,
  };
};
