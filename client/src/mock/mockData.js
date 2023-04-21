export const fakeData = new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  company: "光大永明(寿)",
  name: "光大永明(寿)光大永明(寿)光大永明(寿)光大永明(寿)",
  code: 42,
  paramsDiff: "London No. 1 Lake Park",
}));

export const fakeData1 = new Array(20).fill(0).map((_, index) => ({
  id: index + 1,
  title: "光大永明(寿)",
  publishedDate: "光大永明(寿)光大永明(寿)光大永明(寿)光大永明(寿)",
}));

export const mockCompanyOptions = [
  { value: 1, label: "工银安盛(寿)" },
  { value: 2, label: "光大永明(寿)" },
  { value: 3, label: "和谐健康(寿)" },
  { value: 4, label: "恒大人寿(寿)" },
  { value: 5, label: "瑞泰人寿(寿)" },
  { value: 6, label: "泰康养老(寿)" },
];

export const mockBranchOptions = [
  { value: 1, label: "安徽分公司" },
  { value: 2, label: "福建分公司" },
  { value: 3, label: "广西分公司" },
  { value: 4, label: "河南分公司" },
  { value: 5, label: "河南分公司" },
  { value: 6, label: "上海分公司" },
];
