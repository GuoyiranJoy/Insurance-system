import axios from "axios";
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

const DeleteBatchRate = (ids) => {
  const params = new URLSearchParams();
  params.append("ids", ids);

  return axiosClient({
    method: "post",
    url: "/commission-rate/deleteBatchInsurance",
    params: params,
  });
};

const AddOrUpdateRate = (body) =>
  axiosClient({
    method: "post",
    url: "/commission-rate/addOrUpdateInsurRate",
    data: body,
  });

const ExportRate = () =>
  axios({
    method: "get",
    url: "/api/commission-rate/export",
    responseType: "blob",
  });

export { QueryRate, DeleteRate, DeleteBatchRate, AddOrUpdateRate, ExportRate };
