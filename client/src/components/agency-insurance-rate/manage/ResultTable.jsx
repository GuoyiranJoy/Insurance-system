import { Modal, Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteInsurance } from "../../../services/insurance";
import MyButton from "../../common/MyButton";
import EditInformation from "./edit-information/EditInformation";
import ViewInformation from "./view-information/ViewInformation";

const ResultTable = ({
  rowSelection,
  data,
  allCompanyNames,
  paramDiffNames,
  loading,
  getInsurance,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [curRecord, setCurRecord] = useState(null);

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleViewCancel = () => {
    setIsViewModalVisible(false);
  };

  const handleConfirm = (id) => {
    DeleteInsurance(id).then(() => {
      toast.success("删除成功!");
      getInsurance();
    });
  };

  const columns = [
    {
      title: "序号",
      dataIndex: "insurId",
      key: "insurId",
      width: 60,
    },
    {
      title: "保险公司",
      dataIndex: "companyId",
      key: "companyId",
      render: (record) =>
        allCompanyNames.filter((_) => _.value === record)[0]?.label,
      width: 100,
    },
    {
      title: "险种代码",
      dataIndex: "code",
      key: "code",
      width: 100,
    },
    {
      title: "险种名称",
      dataIndex: "insurFullName",
      key: "insurFullName",
    },
    {
      title: "险种简称",
      dataIndex: "insurShortName",
      key: "insurShortName",
    },
    {
      title: "主附约",
      dataIndex: "mainOrVice",
      key: "mainOrVice",
      width: 70,
    },
    {
      title: "险种类别",
      key: "insurType",
      dataIndex: "insurType",
    },
    {
      title: "启售日",
      dataIndex: "startSaleTime",
      key: "startSaleTime",
      width: 120,
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (_, record) => (
        <Space size="middle">
          <a
            className="text-blue-500"
            onClick={() => {
              setIsViewModalVisible(true);
              setCurRecord(record);
            }}
          >
            查看
          </a>
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
            onConfirm={() => {
              handleConfirm(record.insurId);
            }}
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
        rowKey={"insurId"}
        rowSelection={rowSelection}
        loading={loading}
        columns={columns}
        dataSource={data}
        scroll={{ y: 500 }}
        pagination={{ pageSize: 5 }}
      />

      {/* View Modal */}
      <Modal
        key={`view modal ${isViewModalVisible}`}
        title={"险种信息详情"}
        open={isViewModalVisible}
        onCancel={handleViewCancel}
        footer={[
          <MyButton key="back" onClick={handleViewCancel}>
            {"关闭"}
          </MyButton>,
        ]}
      >
        <ViewInformation
          record={curRecord}
          allCompanyNames={allCompanyNames}
          paramDiffNames={paramDiffNames}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        key={`edit modal ${isEditModalVisible}`}
        title={"编辑险种信息"}
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
      >
        <EditInformation
          record={curRecord}
          allCompanyNames={allCompanyNames}
          paramDiffNames={paramDiffNames}
          setIsModalVisible={setIsEditModalVisible}
          getInsurance={getInsurance}
        />
      </Modal>
    </>
  );
};

export default ResultTable;
