import axiosClient from ".";

const UserLogin = (body) =>
  axiosClient({
    method: "post",
    url: "/user/login",
    data: body,
  });

const UserRegister = (body) =>
  axiosClient({
    method: "post",
    url: "/user/register",
    data: body,
  });

const UserLogout = () =>
  axiosClient({
    method: "get",
    url: "/user/logout",
  });

const IsUserLogin = () =>
  axiosClient({
    method: "get",
    url: "/user/is-login",
  });

export { UserLogin, UserRegister, UserLogout, IsUserLogin };
