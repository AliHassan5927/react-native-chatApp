import { USER, ALLUSER } from '../types';

export const user_setup = payload => {
  return {
    type: USER,
    payload: payload,
  };
};
export const allUsers = payload => {
  return {
    type: ALLUSER,
    payload: payload,
  };
};

