export const generateConditions = (queryConditions, included) => {
  let query = "";
  const conditions = {
    companyType: queryConditions.companyType,
    company: queryConditions.company,
  };
  if (included.isNameIncluded && queryConditions.insurance_cname) {
    conditions.insurance_cname = queryConditions.insurance_cname;
  }
  if (included.isCodeIncluded && queryConditions.code) {
    conditions.code = queryConditions.code;
  }
  if (included.isSellingStatusIncluded && queryConditions.sellingStatus) {
    conditions.sellingStatus = queryConditions.sellingStatus;
  }
  if (included.isMasterIncluded && queryConditions.main_or_vice) {
    conditions.main_or_vice = queryConditions.main_or_vice;
  }
  if (included.isParamsDiffIncluded && queryConditions.paramsDiff) {
    conditions.paramsDiff = queryConditions.paramsDiff;
  }
  if (
    included.isSellingStartPeriodIncluded &&
    queryConditions.start_sale_time
  ) {
    conditions.start_sale_time = queryConditions.start_sale_time;
  }
  if (included.isSellingEndPeriodIncluded && queryConditions.stop_sale_time) {
    conditions.stop_sale_time = queryConditions.stop_sale_time;
  }
  console.log(conditions);
  Object.entries(conditions).forEach(([key, value]) => {
    if (key === "company") {
    } else if (key === "start_sale_time") {
    } else if (key === "stop_sale_time") {
    } else {
      query += `&${key}=${value}`;
    }
  });
  return query;
};
