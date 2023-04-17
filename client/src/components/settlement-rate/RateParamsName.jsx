import { Table } from "antd";
import React from "react";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 140,
  },
  {
    title: "费率参数名称",
    dataIndex: "name",
    key: "name",
    width: 240,
  },
  {
    title: "说明",
    dataIndex: "remark",
    key: "remark",
  },
];

const data = [
  { id: 101, name: "首/续年佣金", remark: "" },
  { id: 102, name: "销售奖金", remark: "" },
  { id: 2, name: "续年度服务津贴", remark: "" },
  { id: 6, name: "标准保费折标", remark: "" },
  { id: 8, name: "月度奖金", remark: "" },
  { id: 4, name: "特别奖金换算", remark: "" },
  { id: 13, name: "保险公司继续率换算", remark: "" },
  { id: 0, name: "代理合同佣金", remark: "" },
  { id: 1, name: "核发首/续年佣金", remark: "" },
  { id: 11, name: "内部标准保费折标", remark: "" },
  { id: 12, name: "CFYC", remark: "" },
  { id: 5, name: "继续率换算系数", remark: "" },
];

const RateParamsName = () => {
  return <Table columns={columns} dataSource={data} scroll={{ y: 500 }} />;
};

export default RateParamsName;
