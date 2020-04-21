import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import profile from "./profile/reducer";
import heatmap from "./heatmap/reducer";

export default combineReducers({
  appState,
  user,
  profile,
  heatmap,
});
