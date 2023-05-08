import {
  Checkbox,
  DatePicker,
  Divider,
  InputNumber,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { vehicleTypeOptions } from "../../../utils/options";
import { createInputStyle, editSelectStyle } from "../../../utils/styles";
import { carRateColumns } from "../constant";
const { RangePicker } = DatePicker;

const itemTitleStyle = "w-16 py-1 pr-2 text-right font-semibold text-gray-600";

const EditInformation = ({
  curCar,
  setCar,
  allCompanyOptions,
  allBranchOptions,
}) => {
  const companyInt2StrMap = new Map(
    allCompanyOptions.map((obj) => [obj.value, obj.label])
  );
  const branchInt2StrMap = new Map(
    allBranchOptions.map((obj) => [obj.value, obj.label])
  );
  const companyStr2IntMap = new Map(
    allCompanyOptions.map((obj) => [obj.label, obj.value])
  );
  const branchStr2IntMap = new Map(
    allBranchOptions.map((obj) => [obj.label, obj.value])
  );

  const {
    rateName,
    insurStarttime,
    insurEndtime,
    companyNameList,
    branchNameList,
    vehicleType,
    insurTypeName,
    commissionRateIn,
    commissionRateOut,
  } = curCar;

  const [activeKey, setActiveKey] = useState("1");

  const [rateIn, setRateIn] = useState(commissionRateIn);
  const [rateOut, setRateOut] = useState(commissionRateOut);

  const [rateList, setRateList] = useState([]);

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);
  const [isEveryBranchSelected, setIsEveryBranchSelected] = useState(false);

  useEffect(() => {
    const list = [];
    let id = 1;
    for (let i = 0; i < companyNameList.length; i++) {
      for (let j = 0; j < branchNameList.length; j++) {
        list.push({
          id,
          insurTypeName,
          vehicleType,
          rateIn,
          rateOut,
          companyName: companyNameList[i],
          branchName: branchNameList[j],
        });
        id++;
      }
    }
    setRateList(list);
    setCar((pre) => ({
      ...pre,
      commissionRateIn: rateIn,
      commissionRateOut: rateOut,
    }));
  }, [rateIn, rateOut, activeKey]);

  const handleSelectCompany = (value) => {
    setCar((pre) => ({
      ...pre,
      companyNameList: value.map((_) => companyInt2StrMap.get(_)),
    }));
    if (value.length === allCompanyOptions.length) {
      setIsEveryCompanySelected(true);
    } else {
      setIsEveryCompanySelected(false);
    }
  };

  const handleSelectBranch = (value) => {
    setCar((pre) => ({
      ...pre,
      branchNameList: value.map((_) => branchInt2StrMap.get(_)),
    }));
    if (value.length === allBranchOptions.length) {
      setIsEveryBranchSelected(true);
    } else {
      setIsEveryBranchSelected(false);
    }
  };

  const handleSelectAllCompanies = (e) => {
    const all = allCompanyOptions.map((item) => item.label);
    if (e.target.checked) {
      setIsEveryCompanySelected(true);
      setCar((pre) => ({
        ...pre,
        companyNameList: all,
      }));
    } else {
      setIsEveryCompanySelected(false);
      setCar((pre) => ({
        ...pre,
        companyNameList: [],
      }));
    }
  };

  const handleSelectAllBranches = (e) => {
    const all = allBranchOptions.map((item) => item.label);
    if (e.target.checked) {
      setIsEveryBranchSelected(true);
      setCar((pre) => ({
        ...pre,
        branchNameList: all,
      }));
    } else {
      setIsEveryBranchSelected(false);
      setCar((pre) => ({
        ...pre,
        branchNameList: [],
      }));
    }
  };

  const items = [
    {
      key: "1",
      label: "基本信息",
      children: (
        <div className="-mt-2 mb-4 px-2">
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>名称</p>
            <input
              type="text"
              className={createInputStyle}
              value={rateName}
              onChange={(e) => {
                setCar((pre) => ({ ...pre, rateName: e.target.value }));
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>有效期</p>
            <RangePicker
              defaultValue={[dayjs(insurStarttime), dayjs(insurEndtime)]}
              style={{ flex: 1, marginTop: "0.5rem" }}
              onChange={(value) => {
                const [from, to] =
                  value?.map((_) => _.format("YYYY-MM-DD")) || [];
                setCar((pre) => ({
                  ...pre,
                  insurStarttime: from,
                  insurEndtime: to,
                }));
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>保险公司</p>
            <Space
              style={{ flex: 1, marginTop: "0.5rem" }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                allowClear
                maxTagCount={4}
                placeholder="请选择保险公司"
                onChange={handleSelectCompany}
                options={allCompanyOptions}
                value={companyNameList.map((_) => companyStr2IntMap.get(_))}
                dropdownRender={(menu) => (
                  <>
                    <div className="p-2 pt-1 cursor-pointer">
                      <Checkbox
                        checked={isEveryCompanySelected}
                        onChange={handleSelectAllCompanies}
                      >
                        全选
                      </Checkbox>
                    </div>
                    <Divider style={{ margin: "0 2px" }} />
                    {menu}
                  </>
                )}
              />
            </Space>
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>分支机构</p>
            <Space
              style={{ flex: 1, marginTop: "0.5rem", marginBottom: "0.5rem" }}
              direction="vertical"
            >
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                maxTagCount={3}
                placeholder="请选择分支机构"
                onChange={handleSelectBranch}
                options={allBranchOptions}
                value={branchNameList.map((_) => branchStr2IntMap.get(_))}
                dropdownRender={(menu) => (
                  <>
                    <div className="p-2 pt-1 cursor-pointer">
                      <Checkbox
                        checked={isEveryBranchSelected}
                        onChange={handleSelectAllBranches}
                      >
                        全选
                      </Checkbox>
                    </div>
                    <Divider style={{ margin: "0 2px" }} />
                    {menu}
                  </>
                )}
              />
            </Space>
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>车型</p>
            <select
              className={editSelectStyle}
              value={vehicleType}
              onChange={(e) => {
                setCar((pre) => ({ ...pre, vehicleType: e.target.value }));
              }}
            >
              {vehicleTypeOptions.map(({ value }) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `费率列表-${insurTypeName}`,
      children: (
        <div className="-mt-4 mb-4">
          <div className="my-1 py-1 flex gap-2 items-center rounded hover:bg-gray-100">
            <p className="py-1 ml-4 text-right font-semibold text-gray-600">
              费率调整：
            </p>
            <p>进项</p>
            <InputNumber
              value={rateIn}
              onChange={(value) => {
                setRateIn(value);
              }}
              min={0}
              max={1}
              precision={2}
              step={0.01}
              size="small"
            />
            <p>支项</p>
            <InputNumber
              value={rateOut}
              onChange={(value) => {
                setRateOut(value);
              }}
              min={0}
              max={1}
              precision={2}
              step={0.01}
              size="small"
            />
          </div>
          <Table
            columns={carRateColumns}
            dataSource={rateList}
            rowKey={"id"}
            pagination={false}
            scroll={{ x: 800, y: 500 }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={items}
        onChange={(e) => setActiveKey(e)}
        style={{
          marginBottom: -14,
        }}
      ></Tabs>
    </div>
  );
};

export default EditInformation;
