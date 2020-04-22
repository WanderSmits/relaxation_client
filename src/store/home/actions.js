import axios from "axios";

export const GET_QUOTES_SUCCESS = "GET_QUOTES_SUCCESS";

export const getQuotesSuccess = (quote) => ({
  type: GET_QUOTES_SUCCESS,
  payload: quote,
});

export const getQuote = () => {
  return async (dispatch, getState) => {
    const response = await axios.get(
      `http://quotes.rest/qod.json?category=inspire`
    );

    dispatch(getQuotesSuccess(response.data.contents.quotes));
  };
};
