import axios from "axios";
import { BASE_URL } from "./api.constant";

const Login =(data: any) => {
  console.log("🚀 ~ file: auth.ts:5 ~ Login ~ data:", data)
  return axios({
    method: "post",
    url: `${BASE_URL}/auth/login`,
    data,
  });
}
export default Login
