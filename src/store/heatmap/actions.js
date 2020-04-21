import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import { selectToken } from "../user/selectors";

export const GET_HEATMAP_SUCCESS = "GET_HEATMAP_SUCCESS";

export const getHeatmap = (heatmap) => ({
  type: GET_HEATMAP_SUCCESS,
  payload: heatmap,
});

export const getHeatmapData = () => {
  return async (dispatch, getState) => {
    const user = selectUser(getState());
    const token = selectToken(getState());

    const userId = user.id;
    const response = await axios.get(`${apiUrl}/myprofile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(getHeatmap(response.data.getUserSessions));
  };
};
