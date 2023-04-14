import axios from "axios";

const currentBaseUrl = "https://dummyjson.com/";
let currentAccessToken: string | null = null;

export const httpClient = axios.create({
  baseURL: currentBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      let data = error.response.data;
      data.http_status = error.response.status;

      return Promise.reject(data);
      // throw error
    } else if (error.request) {
      return Promise.reject(new Error(error.request));
    } else {
      return Promise.reject(error);
    }
  },
);

/**
 * func update access token
 * @param token
 */
export function updateAccessToken(token: string | null) {
  if (token) {
    currentAccessToken = token;
    httpClient.defaults.headers.common["x-authorization"] = `Bearer ${token}`;
  } else {
    currentAccessToken = null;
    // @ts-ignore
    httpClient.defaults.headers.common["x-authorization"] = null;
  }
}

/**
 * func get current access token
 */
export function getCurrentAccessToken() {
  return currentAccessToken;
}
