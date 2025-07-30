import { videoApi } from "../api/videoApi";
import { channelApi } from "../api/channelApi";
import { commentApi } from "../api/commentApi";
export const resetState = (dispatch) => {
  dispatch(videoApi.util.resetApiState());
  dispatch(channelApi.util.resetApiState());
  dispatch(commentApi.util.resetApiState());
};
