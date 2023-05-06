import { Popconfirm, Space, Table } from "antd";
import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { toast } from "react-toastify";
import {
  AddOrUpdateRate,
  DeleteBatchRate,
  DeleteRate,
  ExportRate,
} from "../../../../services/commision-rate";
import RateCreateModal from "./RateCreateModal";
import RateEditModal from "./RateEditModal";
import RateViewModal from "./RateViewModal";

const RateTab = ({ insurId, rateParamNames, data, getRates }) => {
  const [curRate, setCurRate] = useState({});

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  const [selectedRates, setSelectedRates] = useState([]);

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

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRates(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedRates,
    onChange: onSelectChange,
  };

  const handleDeleteBatch = () => {
    DeleteBatchRate(selectedRates)
      .then(() => {
        toast.success("批量删除成功!");
        setSelectedRates([]);
        getRates();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExport = () => {
    ExportRate().then((res) => {
      toast.success("导出成功!");
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

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
      <div className="flex pt-2">
        <button
          disabled={!selectedRates.length}
          className={
            "-mt-2 mb-2 px-3 py-1 border-solid border-[1.5px] rounded transition-all duration-100 border-transparent bg-blue-500 text-white hover:bg-blue-500/90 disabled:bg-slate-400/50 disabled:cursor-not-allowed"
          }
          onClick={handleDeleteBatch}
        >
          批量删除
        </button>
        <button
          disabled={!data.length}
          className={
            "-mt-2 ml-3 mb-2 px-3 py-1 border-solid border-[1.5px] rounded transition-all duration-100 border-transparent bg-blue-500 text-white hover:bg-blue-500/90 disabled:bg-slate-400/50 disabled:cursor-not-allowed"
          }
          onClick={handleExport}
        >
          全部导出
        </button>
        <div
          onClick={handleOpenCreateModal}
          className="flex w-fit gap-1 items-center -mt-2 mb-2 ml-auto mr-2 px-3 py-1 bg-[#f1fee4] text-green-600 border-solid border-2 border-green-500 rounded-md"
        >
          <IoMdCreate className="text-lg" />
          <p className="hover:cursor-pointer">新增费率</p>
        </div>
      </div>

      <Table
        className="mb-4"
        rowKey={"rateId"}
        rowSelection={rowSelection}
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
