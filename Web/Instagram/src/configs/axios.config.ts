import axios from "axios";
import { getCookie } from "../utils";

const instance = axios.create({
  baseURL: "http://localhost:8000/api/v1/user",
});

instance.interceptors.request.use((config) => {
  const token = getCookie("jwt");
  const user = getCookie("user");
  if (token) {
    config.headers["authorization"] = `${token}`;
    config.headers["x-client-id"] = `${user}`;
  }
  return config;
});

export default instance;
