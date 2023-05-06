import axiosClient from ".";
import qs from "qs";

const QueryInsurance = (body) =>
  axiosClient({
    method: "post",
    url: "/insurance/queryInsurance",
    data: body,
  });

const UpdateInsurance = (body) =>
  axiosClient({
    method: "post",
    url: "/insurance/updateInsurance",
    data: body,
  });

const DeleteInsurance = (id) =>
  axiosClient({
    method: "post",
    url: "/insurance/deleteInsurance",
    data: qs.stringify({ id: id }),
  });

const DeleteBatchInsurance = (ids) => {
  const params = new URLSearchParams();
  params.append("ids", ids);

  return axiosClient({
    method: "post",
    url: "/insurance/deleteBatchInsurance",
    params: params,
  });
};

const AddInsurance = (body) =>
  axiosClient({ method: "post", url: "/insurance/addInsurance", data: body });

export {
  QueryInsurance,
  UpdateInsurance,
  DeleteInsurance,
  DeleteBatchInsurance,
  AddInsurance,
};
