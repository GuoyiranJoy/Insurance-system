import { Table, Space, Popconfirm } from "antd";
import React from "react";

const confirm = (e) => {
  console.log(e);
};
const cancel = (e) => {
  console.log(e);
};

const columns = [
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "有效期起",
    dataIndex: "validStart",
    key: "validStart",
  },
  {
    title: "有效期止",
    dataIndex: "validEnd",
    key: "validEnd",
  },
  {
    title: "是否审核",
    dataIndex: "isChecked",
    key: "isChecked",
  },
  {
    title: "操作",
    key: "action",
    width: 160,
    render: (_, record) => (
      <Space size="middle">
        <a className="text-blue-500">查看</a>
        <a className="text-blue-500">编辑</a>
        <Popconfirm
          title="删除"
          description="确定要删除吗?"
          onConfirm={confirm}
          onCancel={cancel}
          okType="default"
          okText="是"
          cancelText="否"
        >
          <a className="text-red-500">删除</a>
        </Popconfirm>
      </Space>
    ),
  },
];

const ResultTable = ({ data, loading }) => {
  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      scroll={{ y: 500 }}
    />
  );
};

export default ResultTable;
