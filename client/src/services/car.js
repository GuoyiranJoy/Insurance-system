import axiosClient from ".";
import qs from "qs";

const QueryCar = (body) => {
  const params = new URLSearchParams();
  if (body.companyNames) {
    params.append("companyNames", body.companyNames);
  }
  if (body.branchNames) {
    params.append("branchNames", body.branchNames);
  }
  if (body.rateName) {
    params.append("rateName", body.rateName);
  }

  return axiosClient({
    method: "post",
    url: "/car-insurance-rate/queryCarInsuranceRate",
    params: params,
  });
};

const AddOrUpdateCar = (body) =>
  axiosClient({
    method: "post",
    url: "/car-insurance-rate/saveOrUpdateCarInsuranceRate",
    data: body,
  });

const DeleteCar = (id) =>
  axiosClient({
    method: "post",
    url: "/car-insurance-rate/deleteInsurRule",
    data: qs.stringify({ id: id }),
  });

const DeleteBatchCar = (ids) => {
  const params = new URLSearchParams();
  params.append("ids", ids);

  return axiosClient({
    method: "post",
    url: "/car-insurance-rate/deleteBatchInsurance",
    params: params,
  });
};

const CheckCar = (id) =>
  axiosClient({
    method: "post",
    url: "/car-insurance-rate/checkCarInsuranceRate",
    data: qs.stringify({ id: id }),
  });

export { QueryCar, AddOrUpdateCar, DeleteCar, DeleteBatchCar, CheckCar };
