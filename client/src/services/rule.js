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

export { QueryRule, AddOrUpdateRule, DeleteRule };
