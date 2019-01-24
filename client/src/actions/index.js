import axios from "axios";
import { FETCH_USER } from "./types";

// uses Redux Thunk to gain access to dispatch
//the following will return a function and immediatly call it
// the axios call is made and when that response is received then the action is dispatched.

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/verifiedUser");
  console.log(res);
  dispatch({ type: FETCH_USER, payload: res.data });
};
