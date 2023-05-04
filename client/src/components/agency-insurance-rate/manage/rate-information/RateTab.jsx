import { Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { toast } from "react-toastify";
import {
  AddOrUpdateRate,
  DeleteRate,
} from "../../../../services/commision-rate";
import RateEditModal from "./RateEditModal";
import RateViewModal from "./RateViewModal";
import RateCreateModal from "./RateCreateModal";

const RateTab = ({ insurId, rateParamNames, data, getRates }) => {
  const [curRate, setCurRate] = useState({});

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const columns = [
    {
      title: "序号",
      dataIndex: "rateId",
      width: 50,
    },
    {
      title: "费率参数名称",
      dataIndex: "rateParamNameId",
      width: 150,
      render: (record) =>
        rateParamNames.filter((_) => _.id === +record)[0]?.rateName,
    },
    {
      title: "收/支",
      dataIndex: "inOut",
    },
    {
      title: "年期-起",
      dataIndex: "yearPeriodStart",
    },
    {
      title: "年期-迄",
      dataIndex: "yearPeriodEnd",
    },
    {
      title: "计绩开始",
      dataIndex: "validateDateStart",
    },
    {
      title: "计绩结束",
      dataIndex: "validateDateEnd",
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (record) => (
        <Space size="middle">
          <a className="text-blue-500" onClick={() => handleViewRate(record)}>
            查看
          </a>
          <a
            className="text-blue-500"
            onClick={() => handleOpenEditModal(record)}
          >
            编辑
          </a>
          <Popconfirm
            title="删除"
            description="确定要删除吗?"
            onConfirm={() => {
              handleDeleteRate(record.rateId);
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

  const handleViewRate = (rate) => {
    setIsViewModalVisible(true);
    setCurRate(rate);
  };

  const handleOpenEditModal = (rate) => {
    setIsEditModalVisible(true);
    setCurRate(rate);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleEditRate = () => {
    AddOrUpdateRate(curRate).then(() => {
      toast.success("编辑成功!");
      setIsEditModalVisible(false);
      getRates();
    });
  };

  const handleDeleteRate = (id) => {
    DeleteRate(id).then(() => {
      toast.success("删除成功!");
      getRates();
    });
  };

  return (
    <div>
      <div
        onClick={handleOpenCreateModal}
        className="flex w-fit gap-1 items-center -mt-2 mb-2 ml-auto mr-2 px-3 py-1 bg-[#f1fee4] text-green-600 border-solid border-2 border-green-500 rounded-md"
      >
        <IoMdCreate className="text-lg" />
        <p className="hover:cursor-pointer">新增费率</p>
      </div>
      <Table
        rowKey={"rateId"}
        className="mb-4"
        columns={columns}
        dataSource={data}
        pagination={false}
        size="small"
      />
      {isViewModalVisible && (
        <RateViewModal
          curRate={curRate}
          rateParamNames={rateParamNames}
          visibility={isViewModalVisible}
          handleCancel={() => {
            setIsViewModalVisible(false);
          }}
        />
      )}
      {isEditModalVisible && (
        <RateEditModal
          curRate={curRate}
          setCurRate={setCurRate}
          rateParamNames={rateParamNames}
          visibility={isEditModalVisible}
          handleOk={handleEditRate}
          handleCancel={() => {
            setIsEditModalVisible(false);
          }}
        />
      )}
      {isCreateModalVisible && (
        <RateCreateModal
          insurId={insurId}
          rateParamNames={rateParamNames}
          visibility={isCreateModalVisible}
          closeModal={() => {
            setIsCreateModalVisible(false);
          }}
          getRates={getRates}
        />
      )}
    </div>
  );
};

export default RateTab;
