import jwtDecode from "jwt-decode";
import { httpClient } from "./HttpClient";
import { HttpMethod } from "./api.constant";
import Login from "./auth";

const esc = function (param) {
  return encodeURIComponent(param)
    .replace(/[!'()*]/g, escape)
    .replace(/%20/g, "+");
};

const isNumeric = (value) => {
  return /^-?\d+$/.test(value);
};

const cleanArray = function (actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
};

const httpBuildQuery = function (
  queryData,
  numericPrefix = null,
  argSeparator = "&",
  tempKey = null
) {
  if (!queryData) {
    return "";
  }

  const query = Object.keys(queryData).map(function (k) {
    let res;
    let key = k;

    if (tempKey) {
      key = tempKey + "[" + key + "]";
    }

    if (typeof queryData[k] === "object" && queryData[k] !== null) {
      res = httpBuildQuery(queryData[k], null, argSeparator, key);
    } else {
      if (numericPrefix) {
        key = isNumeric(key) ? numericPrefix + Number(key) : key;
      }

      let val = queryData[k];

      val = val === true ? "1" : val;
      val = val === false ? "0" : val;
      val = val === 0 ? "0" : val;
      val = val || "";

      res = esc(key) + "=" + esc(val);
    }

    return res;
  });

  return cleanArray(query)
    .join(argSeparator)
    .replace(/[!'()*]/g, "");
};

/**
 * fun get query
 * @param queryData
 * @param numericPrefix
 * @param argSeparator
 * @param tempKey
 * @returns {string|string}
 */
export const httpBuildQuerys = (
  queryData,
  numericPrefix = null,
  argSeparator = "&",
  tempKey = null
) => {
  return httpBuildQuery(queryData, numericPrefix, argSeparator, tempKey);
};

/**
 * func get API url
 * @param path
 * @param query
 * @param appendQuery
 * @returns {string}
 */
export const getApiUrl = (path, query = null, appendQuery = false) => {
  if (!path) {
    let error = new Error();
    error.code = "E_API_UNKNOWN";

    throw error;
  }

  path = path.replace(/^api\//, "/");
  if (path.indexOf(":") > -1 && query) {
    Object.keys(query).forEach((key) => {
      if (path.indexOf(":" + key) > -1) {
        path = path.replace(":" + key, query[key]);
      }
    });
  }

  if (appendQuery && query) {
    path = path + (path.indexOf("?") > -1 ? "&" : "?") + httpBuildQuerys(query);
  }

  return path;
};

/**
 * func call to API by axios
 * @param url
 * @param method
 * @param data
 * @param setting
 * @returns {Promise<any | undefined>}
 */
export async function callHttpClientMethod(url, method, data, setting) {
  const currentAccessToken = localStorage.getItem("token");
  try {
    if (currentAccessToken) {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      let token_decode = jwtDecode(currentAccessToken);
      const currentTime = new Date().getTime() / 1000;
      const remainTime = token_decode?.exp - currentTime;
      if (remainTime <= 0) {
        const response = await Login(user);
        localStorage.setItem("token", response?.data?.token);
      }
    }
  } catch (error) {}
  switch (method.toString().toLowerCase()) {
    case HttpMethod.Post:
      return httpClient
        .post(url, data, setting)
        .then((x) =>
          x ? (x.data ? x.data : { http_status: x.status }) : undefined
        );
    case HttpMethod.Put:
      return httpClient
        .put(url, data)
        .then((x) =>
          x ? (x.data ? x.data : { http_status: x.status }) : undefined
        );
    case HttpMethod.Delete:
      return httpClient
        .delete(url, { data })
        .then((x) =>
          x ? (x.data ? x.data : { http_status: x.status }) : undefined
        );
    case HttpMethod.Patch:
      return httpClient
        .patch(url, data)
        .then((x) =>
          x ? (x.data ? x.data : { http_status: x.status }) : undefined
        );
    case HttpMethod.Get:
    default:
      return httpClient
        .get(getApiUrl(url, data, true), { ...setting, params: {} })
        .then((x) =>
          x ? (x.data ? x.data : { http_status: x.status }) : undefined
        );
  }
}
