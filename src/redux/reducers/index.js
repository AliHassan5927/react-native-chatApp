import { USER, ALLUSER } from '../types';
const initialState = {
  user: {},
  allUsers: {},

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER: {
      return {
        ...state,
        user: action.payload,
      }
    }

    case ALLUSER: {
      return {
        ...state,
        allUsers: action.payload,
      }
    }

    default:
      return state;
  }
};
export default reducer;
