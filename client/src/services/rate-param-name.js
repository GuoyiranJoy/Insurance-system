import axiosClient from ".";

const GetParamNames = () =>
  axiosClient({ method: "get", url: "/rate-param-name/getRateParamName" });
export { GetParamNames };
