import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import { selectToken } from "../user/selectors";

export const postProfile = (interval, notification, totalTime) => {
  return async (dispatch, getState) => {
    const user = selectUser(getState());
    const token = selectToken(getState());

    const userId = user.id;
    console.log("From actions ", interval, notification, totalTime, userId);
    const response = await axios.post(
      `${apiUrl}/myprofile/`,
      {
        interval,
        notification,
        totalTime,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("RESPONSE FROM THE THUNK", response.data);
    // dispatch(productDetailsFetched(response.data));
    // dispatch(appDoneLoading());
  };
};
