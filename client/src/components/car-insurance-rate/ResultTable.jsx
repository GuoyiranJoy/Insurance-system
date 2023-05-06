import { Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DeleteCar } from "../../services/car";
import CheckModal from "./check-car/CheckModal";
import EditModal from "./edit-car/EditModal";
import ViewModal from "./view-car/ViewModal";

const ResultTable = ({
  rowSelection,
  data,
  loading,
  allCompanyOptions,
  allBranchOptions,
  getCars,
}) => {
  const [curCar, setCurCar] = useState({});

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isCheckModalVisible, setIsCheckModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleView = (record) => {
    setCurCar(record);
    setIsViewModalVisible(true);
  };

  const handleCheck = (record) => {
    setCurCar(record);
    setIsCheckModalVisible(true);
  };

  const handleEdit = (record) => {
    setCurCar(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (id) => {
    DeleteCar(id).then(() => {
      toast.success("删除成功!");
      getCars();
    });
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
      render: (_, record) => (
        <Space size="middle">
          {record.isChecked ? (
            <a className="text-blue-500" onClick={() => handleView(record)}>
              查看
            </a>
          ) : (
            <a className="text-blue-500" onClick={() => handleCheck(record)}>
              审核
            </a>
          )}
          <a
            className={`${
              record.isChecked
                ? "cursor-not-allowed text-gray-300 hover:text-gray-300"
                : "text-blue-500"
            }`}
            onClick={() => handleEdit(record)}
          >
            编辑
          </a>
          <Popconfirm
            title="删除"
            description="确定要删除吗?"
            onConfirm={() => handleDelete(record.carInsurId)}
            okType="default"
            okText="是"
            cancelText="否"
          >
            <a className="text-red-500 hover:text-red-500/50">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        rowKey="carInsurId"
        rowSelection={rowSelection}
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ y: 500 }}
        pagination={{ pageSize: 5 }}
      />
      {isViewModalVisible && (
        <ViewModal
          curCar={curCar}
          visibility={isViewModalVisible}
          setIsModalVisible={setIsViewModalVisible}
        />
      )}
      {isCheckModalVisible && (
        <CheckModal
          curCar={curCar}
          visibility={isCheckModalVisible}
          setIsModalVisible={setIsCheckModalVisible}
          getCars={getCars}
        />
      )}
      {isEditModalVisible && (
        <EditModal
          curCar={curCar}
          visibility={isEditModalVisible}
          setIsModalVisible={setIsEditModalVisible}
          allCompanyOptions={allCompanyOptions}
          allBranchOptions={allBranchOptions}
          getCars={getCars}
        />
      )}
    </>
  );
};

export default ResultTable;
