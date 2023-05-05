import axiosClient from ".";
import qs from "qs";

const QueryRate = (id) =>
  axiosClient({
    method: "post",
    url: "/commission-rate/queryInsurRate",
    data: qs.stringify({ insurId: id }),
  });

const DeleteRate = (id) =>
  axiosClient({
    method: "post",
    url: "/commission-rate/deleteInsurRate",
    data: qs.stringify({ rateId: id }),
  });

const AddOrUpdateRate = (body) =>
  axiosClient({
    method: "post",
    url: "/commission-rate/addOrUpdateInsurRate",
    data: body,
  });

export { QueryRate, DeleteRate, AddOrUpdateRate };
