import { Modal, Table } from "antd";
import React, { useState } from "react";
import MyButton from "../../common/MyButton";
import { ExportBlank } from "../../../services/excel";
import { toast } from "react-toastify";

const GenerateModal = ({ visibility, setVisibility }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "字段名称",
      dataIndex: "name",
      key: "name",
      width: 70,
    },
    {
      title: "备注",
      dataIndex: "label",
      key: "label",
      width: 70,
    },
  ];

  const fields = [
    { key: 0, name: "insurId", label: "险种id" },
    { key: 1, name: "companyId", label: "保险公司" },
    { key: 2, name: "insurFullName", label: "险种全称" },
    { key: 3, name: "insurShortName", label: "险种简称" },
    { key: 4, name: "code", label: "险种代码" },
    { key: 5, name: "mainOrVice", label: "主/附约" },
    { key: 6, name: "paramDiffNameId", label: "参数区别" },
    { key: 7, name: "insurType", label: "险种类型" },
    { key: 8, name: "startSaleTime", label: "启售时间" },
    { key: 9, name: "stopSaleTime", label: "停售时间" },
    { key: 10, name: "remark", label: "备注" },
    { key: 11, name: "commonYear", label: "交费年期" },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: function (newSelectedRowKeys) {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleOk = async () => {
    const fieldSet = new Set(selectedRowKeys);
    if (!fieldSet.size) {
      toast.error("请选择至少一个字段!");
      return;
    }

    await ExportBlank(selectedRowKeys, "D:/Chrome下载").then(() => {
      toast.success("空模板已生成!");
    });
    setVisibility(false);
  };

  return (
    <Modal
      key={visibility}
      title={"可选字段"}
      open={visibility}
      closable={false}
      footer={[
        <MyButton
          key="cancel"
          onClick={() => {
            setVisibility(false);
          }}
        >
          {"关闭"}
        </MyButton>,
        <MyButton type="primary" key="ok" onClick={handleOk}>
          {"确定"}
        </MyButton>,
      ]}
    >
      <Table
        size="small"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={fields}
        pagination={false}
        scroll={{ y: 400 }}
      />
    </Modal>
  );
};

export default GenerateModal;
