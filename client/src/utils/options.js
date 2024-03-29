// exportFields 与 exportRateFields 每项key属性不能修改为其他名称
export const exportFields = [
  { key: 1, name: "序号", label: "insurId" },
  { key: 3, name: "保险公司", label: "companyName" },
  { key: 4, name: "险种名称", label: "insurFullName" },
  { key: 5, name: "险种简称", label: "insurShortName" },
  { key: 6, name: "险种代码", label: "code" },
  { key: 7, name: "主附约", label: "mainOrVice" },
  { key: 8, name: "参数区别", label: "paramDiffName" },
  { key: 9, name: "险种类别", label: "insurType" },
  { key: 10, name: "启售日", label: "startSaleTime" },
  { key: 11, name: "停售日", label: "stopSaleTime" },
  { key: 12, name: "备注", label: "remark" },
  { key: 13, name: "常用年期", label: "commonYear" },
];
export const exportRateFields = [
  { key: 101, name: "首/续年佣金" },
  { key: 102, name: "销售奖金" },
  { key: 2, name: "续年度服务津贴" },
  { key: 6, name: "标准保费折标" },
  { key: 8, name: "月度奖金" },
  { key: 4, name: "特别奖金换算" },
  { key: 13, name: "保险公司继续率换算" },
  { key: 0, name: "代理合同佣金" },
  { key: 1, name: "核发首/续年佣金" },
  { key: 11, name: "内部标准保费折标" },
  { key: 12, name: "CFYC" },
  { key: 5, name: "继续率换算系数" },
];

export const rateParamsOptions = exportRateFields.map((_) => ({
  value: _.key,
  label: _.name,
}));

export const paramTypeOptionsForQuery = [
  { value: 1, name: "全部" },
  { value: 0, name: "一般险种" },
  { value: 11, name: "团体险种" },
  { value: 12, name: "卡单险种" },
  { value: 13, name: "车险险种" },
  { value: 14, name: "财险险种" },
  { value: 98, name: "自营网络平台险种" },
  { value: 99, name: "第三方网络平台险种" },
];

export const paramTypeOptionsForCreate = [
  { value: 0, name: "一般险种" },
  { value: 11, name: "团体险种" },
  { value: 12, name: "卡单险种" },
  { value: 13, name: "车险险种" },
  { value: 14, name: "财险险种" },
  { value: 98, name: "自营网络平台险种" },
  { value: 99, name: "第三方网络平台险种" },
];

export const masterOptionsForQuery = [
  { value: "全部", name: "全部" },
  { value: "主约", name: "主约" },
  { value: "附约", name: "附约" },
];

export const masterOptionsForCreate = [
  { value: "主约", name: "主约" },
  { value: "附约", name: "附约" },
];

export const vehicleTypeOptions = [
  { value: "家庭自用汽车6座以下", name: "家庭自用汽车6座以下" },
  { value: "家庭自用汽车6座及以上", name: "家庭自用汽车6座及以上" },
  { value: "企业非营业汽车6座以下", name: "企业非营业汽车6座以下" },
  { value: "企业非营业汽车6-10座", name: "企业非营业汽车6-10座" },
  { value: "企业非营业汽车11-20座", name: "企业非营业汽车11-20座" },
  { value: "企业非营业汽车20座以上", name: "企业非营业汽车20座以上" },
];

export const sellingOptions = [
  { value: 0, name: "全部" },
  { value: 1, name: "现售" },
  { value: 2, name: "已停售" },
];

export const companyTypeOptions = [
  { value: 1, name: "所有产险公司" },
  { value: 2, name: "所有寿险公司" },
  { value: 3, name: "指定保险公司" },
];

export const insuranceOptions = [
  { value: 1, name: "全称" },
  { value: 2, name: "简称" },
  { value: 3, name: "代码" },
];

export const typeOrDiffsOptions = [
  { value: 1, name: "险种类别" },
  { value: 2, name: "参数区别" },
];

export const validOptions = [
  { value: 1, name: "有效期起" },
  { value: 2, name: "有效期止" },
];

export const insuranceTypeOptions = [
  { value: 1, name: "人寿-非分红-定期寿险" },
  { value: 2, name: "人寿-非分红-两全寿险" },
  { value: 3, name: "人寿-非分红-终身寿险" },
  { value: 4, name: "人寿-非分红-年金保险" },
  { value: 5, name: "人寿-分红-定期寿险" },
  { value: 6, name: "人寿-分红-两全寿险" },
  { value: 7, name: "人寿-分红-终身寿险" },
  { value: 8, name: "人寿-分红-年金保险" },
  { value: 9, name: "人寿-投资连结产品-非年" },
  { value: 10, name: "人寿-投资连结产品-年金" },
  { value: 11, name: "人寿-万能寿险-非年金保险" },
  { value: 12, name: "人寿-万能寿险-年金保险" },
  { value: 13, name: "意外伤害险-一年期以内" },
  { value: 14, name: "意外伤害险-一年期业务" },
  { value: 15, name: "意外伤害险-一年期以上" },
  { value: 16, name: "健康险-短期（一年及以上）" },
  { value: 17, name: "健康险-长期" },
  { value: 18, name: "企业财产保险" },
  { value: 19, name: "家庭财产保险-投资型家" },
  { value: 20, name: "家庭财产保险-其他" },
  { value: 21, name: "机动车辆保险-交强险" },
  { value: 22, name: "机动车辆保险-其他" },
  { value: 23, name: "工程保险" },
  { value: 24, name: "责任保险" },
  { value: 25, name: "信用保险" },
  { value: 26, name: "保证保险-机动车辆消费贷款保证保险" },
  { value: 27, name: "保证保险-个人贷款抵押房屋保证保险" },
  { value: 28, name: "保证保险-其他" },
  { value: 29, name: "船舶保险" },
  { value: 30, name: "货物运输保险" },
  { value: 31, name: "特殊风险保险" },
  { value: 32, name: "农业保险" },
  { value: 33, name: "健康险-投资性健康险" },
  { value: 34, name: "健康险-其他" },
  { value: 35, name: "意外伤害险-投资型" },
  { value: 36, name: "意外伤害险-其他" },
  { value: 37, name: "其他" },
];
