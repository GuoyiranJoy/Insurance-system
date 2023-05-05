import axiosClient from ".";

const GetParamDiff = () =>
  axiosClient({ method: "get", url: "/param-diff/getParamDiff" });
export { GetParamDiff };
