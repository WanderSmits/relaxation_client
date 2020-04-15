import axios from "axios";
import { apiUrl } from "../../config/constants";

export const postProfile = (interval, notification, totalTime) => {
  return async (dispatch, getState) => {
    console.log("From actions ", interval, notification, totalTime);
    // const response = await axios.get(`${apiUrl}/products/${id}`);
    // console.log("RESPONSE FROM THE THUNK", response.data);
    // dispatch(productDetailsFetched(response.data));
    // dispatch(appDoneLoading());
  };
};
