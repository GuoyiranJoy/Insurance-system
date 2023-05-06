import axiosClient from ".";
import qs from "qs";

const QueryRule = (body) =>
  axiosClient({
    method: "post",
    url: "/check-insur-rule/queryInsurRule",
    data: body,
  });

const AddOrUpdateRule = (body) =>
  axiosClient({
    method: "post",
    url: "/check-insur-rule/addOrUpdateInsurRate",
    data: body,
  });

const DeleteRule = (id) =>
  axiosClient({
    method: "post",
    url: "/check-insur-rule/deleteInsurRule",
    data: qs.stringify({ id: id }),
  });

const DeleteBatchRule = (ids) => {
  const params = new URLSearchParams();
  params.append("ids", ids);

  return axiosClient({
    method: "post",
    url: "/check-insur-rule/deleteBatchInsurance",
    params: params,
  });
};

export { QueryRule, AddOrUpdateRule, DeleteRule, DeleteBatchRule };
