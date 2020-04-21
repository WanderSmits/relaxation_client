import { POST_PROFILE_SUCCESS } from "./actions";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_PROFILE_SUCCESS:
      return { ...action.payload };

    default:
      return state;
  }
};
