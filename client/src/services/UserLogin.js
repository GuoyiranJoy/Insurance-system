import api from "../api/api";

export const UserLogin = (username, password) =>
  api({
    method: "get",
    url: `/users?username=${username}&password=${password}`,
  });
