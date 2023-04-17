import { Checkbox, DatePicker, Divider, Select, Space } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { createInputStyle } from "../../utils/styles";
import { mockCompanyOptions } from "../../mock/mockData";
import RichEditor from "./RichEditor";

const AddInformation = ({ info, setInfo }) => {
  const { name, date, content, company: company_name, branch } = info;

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);

  const handleSelectCompany = (value) => {
    setInfo((pre) => ({ ...pre, company_name: value }));
    if (value.length === mockCompanyOptions.length) {
      setIsEveryCompanySelected(true);
    } else {
      setIsEveryCompanySelected(false);
    }
  };

  const handleSelectAllCompanies = (e) => {
    const all = mockCompanyOptions.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryCompanySelected(true);
      setInfo((pre) => ({
        ...pre,
        company_name: all,
      }));
    } else {
      setIsEveryCompanySelected(false);
      setInfo((pre) => ({
        ...pre,
        company_name: [],
      }));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <p className="shrink-0">名&emsp;&emsp;称</p>
        <input className={createInputStyle} type="text" value={company_name} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="shrink-0">发布日期</p>
        <DatePicker defaultValue={dayjs(new Date())} style={{ flex: 1 }} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="shrink-0 self-start">核保规则</p>
        <RichEditor />
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
            options={mockCompanyOptions}
            value={company_name}
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
            onChange={handleSelectCompany}
            options={mockCompanyOptions}
            value={company_name}
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
    </div>
  );
};

export default AddInformation;
