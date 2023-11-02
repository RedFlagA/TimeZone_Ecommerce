import { call } from "redux-saga/effects";
import { callHttpClientMethod } from "../../services/api/callHttpClient";

/**
 * func saga check token and call setup to call API
 * @param {string} url get url
 * @param {string} method get method
 * @param {any} data get data
 * @param {any} setting get setting
 */
export function* callHttpClientMethodSagas(
  url: string,
  method: string,
  data?: any,
  setting?: any
): any {
  try {
    const response = yield call(
      callHttpClientMethod,
      url,
      method,
      data,
      setting
    );
    return response;
  } catch (error: any) {
    console.log("error", error);
    return {
      error,
    };
  }
}
