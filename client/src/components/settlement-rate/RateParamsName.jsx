import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { GetParamNames } from "../../services/rate-param-name";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 140,
  },
  {
    title: "费率参数名称",
    dataIndex: "rateName",
    key: "rateName",
    width: 240,
  },
  {
    title: "说明",
    dataIndex: "description",
    key: "description",
  },
];

const RateParamsName = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetParamNames().then((res) => {
      setData(res.data.data);
    });
  }, []);
  
  return (
    <Table
      rowKey={"id"}
      columns={columns}
      dataSource={data}
      scroll={{ y: 500 }}
    />
  );
};

export default RateParamsName;
