import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "/api",
  timeout: 5000,
  withCredentials: true,
});

axiosClient.interceptors.response.use((response) => {
  if (!response.data) {
    toast.error("用户登录过期，请重新登录");
    window.location.replace("/login");
    return Promise.reject(response);
  } else if (response.data.code && response.data.code !== "200") {
    toast.error(response.data.msg);
    return Promise.reject(response);
  } else {
    return response;
  }
});

export default axiosClient;
