import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { GetParamDiff } from "../../services/param-diff";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 140,
  },
  {
    title: "项目名称",
    dataIndex: "paramDiffName",
    key: "paramDiffName",
    width: 240,
  },
  {
    title: "说明",
    dataIndex: "description",
    key: "description",
  },
];

const ParamsDiff = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetParamDiff().then((res) => {
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

export default ParamsDiff;
