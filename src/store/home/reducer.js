import { GET_QUOTES_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTES_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
