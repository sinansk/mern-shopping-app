
import { loginFailure, loginStart, loginSuccess, logoutSuccess, registerStart, registerSuccess, registerFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {
    dispatch(logoutSuccess());
  };

export const register = async (dispatch, user) => {
    dispatch(registerStart());
    try {
      const res = await publicRequest.post("/auth/register", user);
      dispatch(registerSuccess(res.data));
    } catch (err) {
      dispatch(registerFailure());
    }
  };