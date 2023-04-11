export const generateConditions = (queryConditions, included) => {
  const conditions = {};
  if (included.isCompanyIncluded && queryConditions.company) {
    conditions.company = queryConditions.company;
  }
  if (included.isBranchIncluded && queryConditions.branch) {
    conditions.branch = queryConditions.branch;
  }
  if (included.isPublishedPeriodIncluded && queryConditions.publishedPeriod) {
    conditions.publishedPeriod = queryConditions.publishedPeriod;
  }
  if (included.isTitleIncluded && queryConditions.title) {
    conditions.title = queryConditions.title;
  }
  return conditions;
};
