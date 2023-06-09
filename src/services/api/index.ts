import axios from "axios";
import { BASE_URL } from "./api.constant";

const API_HEADER = {
  "x-api-key": "your-access-token",
};

export const fetchExample = () =>
  new Promise(async (resolve, reject) => {
    const url = BASE_URL + "your-url";
    axios
      .get(url, {
        headers: API_HEADER,
      })
      .then((res) => {
        res && resolve(res.data);
      })
      .catch((error) => {
        // handle error
        reject(error);
        console.log(error);
      });
  });
