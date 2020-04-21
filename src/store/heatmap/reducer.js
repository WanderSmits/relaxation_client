import { GET_HEATMAP_SUCCESS } from "./actions";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HEATMAP_SUCCESS:
      return [...action.payload];

    default:
      return state;
  }
};
