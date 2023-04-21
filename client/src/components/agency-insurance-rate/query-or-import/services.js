export const generateConditions = (queryConditions, included) => {
  const conditions = {
    companyType: queryConditions.companyType,
    company: queryConditions.company,
  };
  if (included.isRateParamsIncluded && queryConditions.rateParams) {
    conditions.rateParams = queryConditions.rateParams;
  }
  if (included.isFullNameIncluded && queryConditions.fullName) {
    conditions.fullName = queryConditions.fullName;
  }
  if (included.isSimpleNameIncluded && queryConditions.simpleName) {
    conditions.simpleName = queryConditions.simpleName;
  }
  if (included.isCodeIncluded && queryConditions.code) {
    conditions.code = queryConditions.code;
  }
  if (included.isInsuranceTypeIncluded && queryConditions.insuranceType) {
    conditions.insuranceType = queryConditions.insuranceType;
  }
  if (included.isParamsDiffIncluded && queryConditions.paramsDiff) {
    conditions.paramsDiff = queryConditions.paramsDiff;
  }
  if (included.isValidStartIncluded && queryConditions.validStart) {
    conditions.validStart = queryConditions.validStart;
  }
  if (included.isValidEndIncluded && queryConditions.validEnd) {
    conditions.validEnd = queryConditions.validEnd;
  }
  return conditions;
};
