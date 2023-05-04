import { Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DeleteRule } from "../../services/rule";
import EditModal from "./edit-rule/EditModal";
import ViewModal from "./view-rule/ViewModal";

const ResultTable = ({
  data,
  loading,
  getRules,
  allCompanyOptions,
  allBranchOptions,
}) => {
  const [curRecord, setCurRecord] = useState({});

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleDelete = (id) => {
    DeleteRule(id).then(() => {
      toast.success("删除成功!");
      getRules();
    });
  };

  const openViewModal = (record) => {
    setCurRecord(record);
    setIsViewModalVisible(true);
  };

  const openEditModal = (record) => {
    setCurRecord(record);
    setIsEditModalVisible(true);
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "发布日期",
      dataIndex: "releaseDate",
      key: "releaseDate",
      width: 200,
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (record) => (
        <Space size="middle">
          <a className="text-blue-500" onClick={() => openViewModal(record)}>
            查看
          </a>
          <a className="text-blue-500" onClick={() => openEditModal(record)}>
            编辑
          </a>
          <Popconfirm
            title="删除"
            description="确定要删除吗?"
            onConfirm={() => handleDelete(record.id)}
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
        rowKey={"id"}
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ y: 500 }}
      />
      {isViewModalVisible && (
        <ViewModal
          curRecord={curRecord}
          visibility={isViewModalVisible}
          setIsModalVisible={setIsViewModalVisible}
        />
      )}
      {isEditModalVisible && (
        <EditModal
          curRecord={curRecord}
          visibility={isEditModalVisible}
          setIsModalVisible={setIsEditModalVisible}
          allCompanyOptions={allCompanyOptions}
          allBranchOptions={allBranchOptions}
          getRules={getRules}
        />
      )}
    </>
  );
};

export default ResultTable;
