import { Checkbox, DatePicker, Divider, Select, Space } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { createInputStyle } from "../../../utils/styles";
import RichEditor from "../RichEditor";

const EditInformation = ({
  info,
  setInfo,
  allCompanyOptions,
  allBranchOptions,
}) => {
  const { name, rule, companyName, branchName, releaseDate } = info;

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);
  const [isEveryBranchSelected, setIsEveryBranchSelected] = useState(false);

  const handleSelectCompany = (value) => {
    setInfo((pre) => ({ ...pre, companyName: value }));
    if (value.length === allCompanyOptions.length) {
      setIsEveryCompanySelected(true);
    } else {
      setIsEveryCompanySelected(false);
    }
  };

  const handleSelectBranch = (value) => {
    setInfo((pre) => ({ ...pre, branchName: value }));
    if (value.length === allBranchOptions.length) {
      setIsEveryBranchSelected(true);
    } else {
      setIsEveryBranchSelected(false);
    }
  };

  const handleSelectAllCompanies = (e) => {
    const all = allCompanyOptions.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryCompanySelected(true);
      setInfo((pre) => ({
        ...pre,
        companyName: all,
      }));
    } else {
      setIsEveryCompanySelected(false);
      setInfo((pre) => ({
        ...pre,
        companyName: [],
      }));
    }
  };

  const handleSelectAllBranches = (e) => {
    const all = allBranchOptions.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryBranchSelected(true);
      setInfo((pre) => ({
        ...pre,
        branchName: all,
      }));
    } else {
      setIsEveryBranchSelected(false);
      setInfo((pre) => ({
        ...pre,
        branchName: [],
      }));
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <p className="shrink-0">名&emsp;&emsp;称</p>
        <input
          className={createInputStyle}
          type="text"
          value={name}
          onChange={(e) => {
            setInfo((pre) => ({ ...pre, name: e.target.value }));
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p className="shrink-0">发布日期</p>
        <DatePicker
          style={{ flex: 1 }}
          defaultValue={dayjs(releaseDate)}
          disabledDate={(current) => current && current > dayjs().endOf("day")}
          onChange={(value) => {
            setInfo((pre) => ({
              ...pre,
              releaseDate: value?.format("YYYY-MM-DD"),
            }));
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p className="shrink-0 self-start">核保规则</p>
        <RichEditor
          value={rule}
          onChange={(value) => {
            setInfo((pre) => ({ ...pre, rule: value }));
          }}
        />
      </div>
      <div className="flex gap-2 items-center">
        <p className="shrink-0">保险公司</p>
        <Space
          style={{
            flex: "1",
          }}
          direction="vertical"
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            maxTagCount={4}
            placeholder="请选择保险公司"
            onChange={handleSelectCompany}
            options={allCompanyOptions}
            value={companyName}
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
        <p className="shrink-0">分支机构</p>
        <Space
          style={{
            flex: "1",
          }}
          direction="vertical"
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            maxTagCount={4}
            placeholder="请选择分支机构"
            onChange={handleSelectBranch}
            options={allBranchOptions}
            value={branchName}
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
    </div>
  );
};

export default EditInformation;
