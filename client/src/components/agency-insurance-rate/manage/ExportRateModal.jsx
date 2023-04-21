import { Modal, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { exportRateFields } from "../../../utils/options";
import toExcel, { formatJson } from "../../../utils/toExcel";
import MyButton from "../../common/MyButton";

const exportRateColumns = [
  {
    title: "费率参数名称",
    dataIndex: "name",
    key: "name",
    width: 70,
  },
];

const ExportRateModal = ({ visibility, setIsModalVisible, results }) => {
  const [pagination, setPagination] = useState(0);
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
    const th = exportRateFields
      .filter((item) => fieldSet.has(item.key))
      .map((item) => item.name);
    const filterVal = exportRateFields
      .filter((item) => fieldSet.has(item.key))
      .map((item) => item.label);
    const data = formatJson(filterVal, results);
    toExcel({
      th,
      data,
      fileName: "代理险种费率信息",
      fileType: "xlsx",
      sheetName: "代理险种费率信息",
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
        title={"导出费率参数选择"}
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
        <div
          className="flex pb-1 justify-end items-center gap-4 text-[16px]"
          onChange={(e) => {
            setPagination(+e.target.value);
          }}
        >
          <label htmlFor="single" className="hover:cursor-pointer">
            <input
              className="outline-none w-4 h-4 mr-1"
              type="radio"
              value={0}
              name="pagination"
              id="single"
              checked={pagination === 0}
            />
            {"单页导出"}
          </label>

          <label htmlFor="multiple" className="hover:cursor-pointer">
            <input
              className="outline-none"
              type="radio"
              value={1}
              name="pagination"
              id="multiple"
              checked={pagination === 1}
            />
            {"多页导出"}
          </label>
        </div>
        <Table
          size="small"
          rowSelection={rowSelection}
          columns={exportRateColumns}
          dataSource={exportRateFields}
          pagination={false}
          scroll={{ y: 400 }}
        />
      </Modal>
    </>
  );
};

export default ExportRateModal;
