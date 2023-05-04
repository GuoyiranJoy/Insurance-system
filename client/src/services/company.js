import axiosClient from ".";

const GetCompany = () =>
  axiosClient({
    method: "get",
    url: "/company/getAllCompanyNames",
  });

export { GetCompany };
