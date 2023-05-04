import axiosClient from ".";

const GetBranch = () =>
  axiosClient({ method: "get", url: "/branch/getAllBranchNames" });

export { GetBranch };
