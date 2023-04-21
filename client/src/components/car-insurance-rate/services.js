export const generateConditions = (queryConditions, included) => {
  const conditions = {};
  if (included.isCompanyIncluded && queryConditions.company) {
    conditions.company = queryConditions.company;
  }
  if (included.isBranchIncluded && queryConditions.branch) {
    conditions.branch = queryConditions.branch;
  }
  if (included.isNameIncluded && queryConditions.name) {
    conditions.name = queryConditions.name;
  }
  return conditions;
};
