import { Table, Space, Popconfirm } from "antd";
import React, { useState } from "react";

const ResultTable = ({ data, loading }) => {
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  const confirm = (id) => {
    console.log(id);
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "rateName",
      key: "rateName",
    },
    {
      title: "有效期起",
      dataIndex: "insurStarttime",
      key: "insurStarttime",
    },
    {
      title: "有效期止",
      dataIndex: "insurEndtime",
      key: "insurEndtime",
    },
    {
      title: "是否审核",
      dataIndex: "isChecked",
      key: "isChecked",
      render: (record) => (record ? "已审核" : "未审核"),
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <a className="text-blue-500">查看</a>
          <a
            className={`${
              record.isChecked
                ? "cursor-not-allowed text-gray-300 hover:text-gray-300"
                : "text-blue-500"
            }`}
          >
            编辑
          </a>
          <Popconfirm
            title="删除"
            description="确定要删除吗?"
            onConfirm={() => confirm(record.carInsurId)}
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
  return (
    <Table
      rowKey="carInsurId"
      loading={loading}
      columns={columns}
      dataSource={data}
      scroll={{ y: 500 }}
    />
  );
};

export default ResultTable;
