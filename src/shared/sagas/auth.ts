/* eslint-disable import/no-anonymous-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import { callHttpClientMethodSagas } from "./callHttpClientMethodSagas";
import { HttpMethod } from "../../services/api/api.constant";
import { setUserInfo } from "../store/authSlice";

type PayloadActionLoginType = {
  type: string;
  payload: {
    username: string;
    password: string;
    loginSuccess: Function;
  };
};
type PayloadActionLogOutType = {
  type: string;
  payload: {
    logoutSuccess: Function;
  };
};
export function* login(action: PayloadActionLoginType): any {
  const { username, password, loginSuccess } = action.payload;
  try {
    const response = yield call(
      callHttpClientMethodSagas,
      `auth/login`,
      HttpMethod.Post,
      JSON.stringify({
        username,
        password,
        expiresInMins: 1, // optional
      })
    );
    if (response) {
      localStorage.setItem("token", response.token);
      yield put(setUserInfo(response));
      loginSuccess(true);
    }
  } catch (error) {
    console.log("🚀 ~ file: auth.ts:30 ~ function*login ~ error:", error);
    loginSuccess(false);
  }
}

export function* logout(action: PayloadActionLogOutType): any {
  const { logoutSuccess } = action.payload;
  try {
    const user = {};
    yield put(setUserInfo(user));
    localStorage.clear();
    logoutSuccess(true);
  } catch (error) {
    console.log("🚀 ~ file: auth.ts:45 ~ function*logout ~ error:", error);
  }
}

export default [
  takeEvery("@saga/Login", login),
  takeEvery("@saga/Logout", logout),
];
