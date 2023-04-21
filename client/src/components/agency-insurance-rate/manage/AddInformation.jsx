import { Input, InputNumber, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api/api";
import { insuranceTypeOptions, masterOptions } from "../../../utils/options";
import { buttonStyle, createInputStyle } from "../../../utils/styles";
import MyButton from "../../common/MyButton";
const { TextArea } = Input;

const AddInformation = ({ setInfo }) => {
  const [companyOptions, setCompanyOptions] = useState([]);
  const [commonYearList, setCommonYearList] = useState([]);
  const [remarkList, setRemarkList] = useState([]);

  const [commonYear, setCommonYear] = useState(1);
  const [remark, setRemark] = useState("");

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const reset = () => {
    setCommonYear(1);
    setRemark("");
  };

  const handleEdit = ({ commonYear, remark }) => {
    setIsEditModalVisible(true);
    setCommonYear(commonYear);
    setCommonYear(remark);
  };

  const handleDelete = (id) => {
    setCommonYearList((pre) => [...pre.slice(0, id - 1), ...pre.slice(id)]);
    setRemarkList((pre) => [...pre.slice(0, id - 1), ...pre.slice(id)]);
  };

  const handleAddOk = () => {
    if (!commonYear) {
      toast.error("请输入交费年期");
      return;
    }
    setCommonYearList((pre) => [...pre, commonYear]);
    setRemarkList((pre) => [...pre, remark]);
    setInfo((pre) => ({
      ...pre,
      commonYear: [...commonYearList, commonYear],
      remark: [...remarkList, remark],
    }));
    reset();
    setIsAddModalVisible(false);
  };

  useEffect(() => {
    setInfo({ main_or_vice: masterOptions[0]?.value });
    api({ method: "get", url: "/companyOptions" }).then((res) => {
      setCompanyOptions(res.data);
      setInfo((pre) => ({
        ...pre,
        company: res.data[0]?.value,
      }));
    });
  }, []);

  const commYearColumns = [
    {
      title: "年期/分档",
      dataIndex: "commonYear",
      width: 60,
    },
    {
      title: "说明",
      dataIndex: "remark",
    },
    {
      title: "操作",
      key: "action",
      width: 160,
      render: (record) => (
        <Space size="middle">
          <a className="text-blue-500" onClick={() => handleEdit(record)}>
            编辑
          </a>
          <a className="text-red-500" onClick={() => handleDelete(record.id)}>
            移除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <p>保险公司</p>
        <select
          className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
          name="company"
          id="company"
          defaultValue={companyOptions[0]}
          onChange={(e) => {
            setInfo((pre) => ({
              ...pre,
              company: +e.target.value,
            }));
          }}
        >
          {companyOptions.length &&
            companyOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <p>主&ensp;/附约</p>
        <select
          className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
          id="main_or_vice"
          onChange={(e) => {
            setInfo((pre) => ({
              ...pre,
              main_or_vice: +e.target.value,
            }));
          }}
        >
          {masterOptions.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <p>险种代码</p>
        <input
          className={createInputStyle}
          type="text"
          id="insurance-code"
          onChange={(e) => {
            setInfo((pre) => ({
              ...pre,
              code: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>险种类别</p>
        <select
          className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
          id="insurance-type"
          onChange={(e) => {
            setInfo((pre) => ({
              ...pre,
              insurance_type: e.target.value,
            }));
          }}
        >
          {insuranceTypeOptions.length &&
            insuranceTypeOptions.map(({ value, name }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex gap-2 items-center">
        <p>险种全称</p>
        <input
          className={createInputStyle}
          type="text"
          id=""
          onChange={(e) => {
            setInfo((pre) => ({
              ...pre,
              insurance_type: e.target.value,
            }));
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p>险种简称</p>
        <input className={createInputStyle} type="text" name="" id="" />
        <label htmlFor="">
          <input type="checkbox" name="insurance-code" id="insurance-code" />
          费率同步主约
        </label>
      </div>
      <div className="flex gap-2 items-center">
        <p>参数区别</p>
        <select
          className="border border-gray-300 border-solid rounded outline-none flex-1 py-1"
          name=""
          id=""
        >
          <option value="">全部</option>
        </select>
        <label htmlFor="">
          <input type="checkbox" name="insurance-code" id="insurance-code" />
          费率同步首年
        </label>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold">交费年期一览表</p>
        <button
          className={buttonStyle}
          onClick={() => setIsAddModalVisible(true)}
        >
          新增交费年期
        </button>
      </div>
      <Table
        rowKey="id"
        columns={commYearColumns}
        dataSource={commonYearList.map((item, index) => ({
          id: index + 1,
          commonYear: item,
          remark: remarkList[index],
        }))}
        pagination={false}
        size="small"
      />
      {/* CommonYear AddModal */}
      <Modal
        key={isAddModalVisible}
        title={"交费年期添加"}
        open={isAddModalVisible}
        closable={false}
        footer={[
          <MyButton
            key="cancel"
            onClick={() => {
              setIsAddModalVisible(false);
            }}
          >
            {"关闭"}
          </MyButton>,
          <MyButton type="primary" key="ok" onClick={handleAddOk}>
            {"确定"}
          </MyButton>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <p className="w-8 mr-2">年期</p>
            <InputNumber
              min={1}
              max={50}
              defaultValue={commonYear}
              onChange={(value) => {
                setCommonYear(value);
              }}
            />
          </div>
          <div className="flex items-start">
            <p className="w-8 mr-2">说明</p>
            <TextArea
              rows={4}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
      {/* CommonYear EditModal */}
      <Modal
        key={isEditModalVisible}
        title={"交费年期编辑"}
        open={isEditModalVisible}
        closable={false}
        footer={[
          <MyButton
            key="cancel"
            onClick={() => {
              setIsEditModalVisible(false);
            }}
          >
            {"关闭"}
          </MyButton>,
          <MyButton type="primary" key="ok" onClick={handleAddOk}>
            {"确定"}
          </MyButton>,
        ]}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <p className="w-8 mr-2">年期</p>
            <InputNumber
              min={1}
              max={50}
              defaultValue={commonYear}
              onChange={(value) => {
                setCommonYear(value);
              }}
            />
          </div>
          <div className="flex items-start">
            <p className="w-8 mr-2">说明</p>
            <TextArea
              rows={4}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddInformation;
