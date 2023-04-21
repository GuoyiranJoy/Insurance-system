import { Modal, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { exportFields } from "../../../utils/options";
import toExcel, { formatJson } from "../../../utils/toExcel";
import MyButton from "../../common/MyButton";

const exportColumns = [
  {
    title: "字段名称",
    dataIndex: "name",
    key: "name",
    width: 70,
  },
];

const ExportModal = ({ visibility, setIsModalVisible, results }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const exportExcel = () => {
    if (!results || !results.length) {
      toast.error("无法导出空列表, 请查询后重试!");
      return false;
    }
    const fieldSet = new Set(selectedRowKeys);
    if (!fieldSet.size) {
      toast.error("请选择至少一个导出字段!");
      return false;
    }
    const th = exportFields
      .filter((item) => fieldSet.has(item.key))
      .map((item) => item.name);
    const filterVal = exportFields
      .filter((item) => fieldSet.has(item.key))
      .map((item) => item.label);
    const data = formatJson(filterVal, results);
    toExcel({
      th,
      data,
      fileName: "代理险种信息",
      fileType: "xlsx",
      sheetName: "代理险种信息",
    });
    return true;
  };

  const handleOk = () => {
    setIsModalVisible(!exportExcel());
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        title={"导出字段选择"}
        open={visibility}
        onCancel={handleCancel}
        footer={[
          <MyButton key="back" onClick={handleCancel}>
            {"取消"}
          </MyButton>,
          <MyButton
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            {"确认"}
          </MyButton>,
        ]}
      >
        <Table
          size="small"
          rowSelection={rowSelection}
          columns={exportColumns}
          dataSource={exportFields}
          pagination={false}
          scroll={{ y: 400 }}
        />
      </Modal>
    </>
  );
};

export default ExportModal;
