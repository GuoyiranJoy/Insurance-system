import axios from "axios";

export const UserLogin = (username, password) =>
  axios({
    method: "get",
    url: `http://localhost:8080/users?username=${username}&password=${password}`,
  });
