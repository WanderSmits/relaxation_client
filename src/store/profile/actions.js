import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import { selectToken } from "../user/selectors";

export const POST_PROFILE_SUCCESS = "POST_PROFILE_SUCCESS";

export const postProfileSuccess = (profile) => ({
  type: POST_PROFILE_SUCCESS,
  payload: profile,
});

export const postProfile = (interval, notification, totalTime, dateSubmit) => {
  return async (dispatch, getState) => {
    const user = selectUser(getState());
    const token = selectToken(getState());

    const userId = user.id;
    const response = await axios.post(
      `${apiUrl}/myprofile/`,
      {
        interval,
        notification,
        totalTime,
        dateSubmit,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("RESPONSE FROM THE THUNK", response.data.postProfile);
    dispatch(postProfileSuccess(response.data.postProfile));
  };
};
