import { Modal, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyButton from "../../common/MyButton";
import EditInformation from "./EditInformation";

const ResultTable = ({ data, loading, getInsurance }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [curRecord, setCurRecord] = useState(null);

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const confirm = (id) => {
    axios({
      method: "delete",
      url: `http://localhost:8080/insurance/${id}`,
    }).then((res) => {
      toast.success("删除成功!");
      getInsurance();
    });
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "insur_id",
      key: "insur_id",
      width: 70,
    },
    {
      title: "保险公司",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "险种代码",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "险种名称",
      dataIndex: "insurance_cname",
      key: "insurance_cname",
    },
    {
      title: "险种简称",
      dataIndex: "insurance_sname",
      key: "insurance_sname",
    },
    {
      title: "主附约",
      dataIndex: "main_or_vice",
      key: "main_or_vice",
      render: (record) => (record === 0 ? "主约" : "附约"),
    },
    {
      title: "险种类别",
      key: "insurance_type",
      dataIndex: "insurance_type",
    },
    {
      title: "启售日",
      dataIndex: "start_sale_time",
      key: "start_sale_time",
      render: (record) => new Date(record).toLocaleDateString("zh-CN"),
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <a className="text-blue-500">查看</a>
          <a
            className="text-blue-500"
            onClick={() => {
              setIsEditModalVisible(true);
              setCurRecord(record);
            }}
          >
            编辑
          </a>
          <Popconfirm
            title="删除"
            description="确定要删除吗?"
            // onConfirm={() => confirm(record.insur_id)}
            onConfirm={() => confirm(record.id)}
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
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"insur_id"}
        loading={loading}
        scroll={{ y: 500 }}
      />
      <Modal
        title={"险种信息编辑"}
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={[
          <MyButton key="back" loading={loading} onClick={handleEditCancel}>
            {"关闭"}
          </MyButton>,
        ]}
      >
        <EditInformation record={curRecord} />
      </Modal>
    </>
  );
};

export default ResultTable;
