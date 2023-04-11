import { Checkbox, Divider, Select, Space } from "antd";
import React, { useState } from "react";
import {
  fakeData1,
  mockBranchOptions,
  mockCompanyOptions,
} from "../../mock/mockData";
import { buttonStyle, queryInputStyle } from "../../utils/styles";
import { generateConditions } from "./services";
import ResultTable from "./ResultTable";

const CarInsuranceRate = () => {
  const [includedConditions, setIncludedConditions] = useState({
    isCompanyIncluded: false,
    isBranchIncluded: false,
    isNameIncluded: false,
  });

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);
  const [isEveryBranchSelected, setIsEveryBranchSelected] = useState(false);
  const [queryConditions, setQueryConditions] = useState({
    company: [],
    branch: [],
    name: "",
  });
  const [queryResult, setQueryResult] = useState([]);

  const [isTableLoading, setIsTableLoading] = useState(false);

  const handleQuery = (e) => {
    e.preventDefault();
    setIsTableLoading(true);
    console.log(queryConditions);
    const conditions = generateConditions(queryConditions, includedConditions);
    console.log(conditions);
    setTimeout(() => {
      setQueryResult(fakeData1);
      setIsTableLoading(false);
    }, 1000);
  };

  const handleSelectCompany = (value) => {
    setQueryConditions((pre) => ({ ...pre, company: value }));
    if (value.length === mockCompanyOptions.length) {
      setIsEveryCompanySelected(true);
    } else {
      setIsEveryCompanySelected(false);
    }
  };

  const handleSelectBranch = (value) => {
    setQueryConditions((pre) => ({ ...pre, branch: value }));
    if (value.length === mockBranchOptions.length) {
      setIsEveryBranchSelected(true);
    } else {
      setIsEveryBranchSelected(false);
    }
  };

  const handleSelectAllCompanies = (e) => {
    const all = mockCompanyOptions.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryCompanySelected(true);
      setQueryConditions((pre) => ({
        ...pre,
        company: all,
      }));
    } else {
      setIsEveryCompanySelected(false);
      setQueryConditions((pre) => ({
        ...pre,
        company: [],
      }));
    }
  };

  const handleSelectAllBranches = (e) => {
    const all = mockCompanyOptions.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryBranchSelected(true);
      setQueryConditions((pre) => ({
        ...pre,
        branch: all,
      }));
    } else {
      setIsEveryBranchSelected(false);
      setQueryConditions((pre) => ({
        ...pre,
        branch: [],
      }));
    }
  };

  return (
    <div className="pt-2 pb-2 pl-6 lg:pl-8 pr-10 lg:pr-12">
      <form className="w-full py-4 pb-8 gap-4 flex flex-col justify-between">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <label htmlFor="insurance-company">
            保险公司
            <input
              type="checkbox"
              name="insurance-company"
              id="insurance-company"
              onChange={() => {
                setIncludedConditions((pre) => ({
                  ...pre,
                  isCompanyIncluded: !pre.isCompanyIncluded,
                }));
              }}
            />
          </label>
          <Space
            style={{
              flex: "1",
            }}
            direction="vertical"
          >
            <Select
              disabled={!includedConditions.isCompanyIncluded}
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              maxTagCount={7}
              placeholder="请选择保险公司"
              onChange={handleSelectCompany}
              options={mockCompanyOptions}
              value={queryConditions.company}
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

        {/* Row 2 */}
        <div className="flex items-center gap-2">
          <label htmlFor="branch">
            分支机构
            <input
              type="checkbox"
              name="branch"
              id="branch"
              onChange={() => {
                setIncludedConditions((pre) => ({
                  ...pre,
                  isBranchIncluded: !pre.isBranchIncluded,
                }));
              }}
            />
          </label>
          <Space
            style={{
              flex: "1",
            }}
            direction="vertical"
          >
            <Select
              disabled={!includedConditions.isBranchIncluded}
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              maxTagCount={7}
              placeholder="请选择分支机构"
              onChange={handleSelectBranch}
              options={mockBranchOptions}
              value={queryConditions.branch}
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

        {/* Row 3 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 py-1">
            <label htmlFor="name">
              费率名称
              <input
                type="checkbox"
                name="name"
                id="name"
                onChange={() => {
                  setIncludedConditions((pre) => ({
                    ...pre,
                    isNameIncluded: !pre.isNameIncluded,
                  }));
                }}
              />
            </label>
            <input
              className={queryInputStyle}
              type="text"
              disabled={!includedConditions.isNameIncluded}
              onChange={(e) => {
                setQueryConditions((pre) => ({
                  ...pre,
                  name: e.target.value,
                }));
              }}
            />
          </div>
        </div>

        <div className="flex pt-2">
          <button
            className={buttonStyle}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            新增一笔
          </button>
          <button
            type="submit"
            onClick={handleQuery}
            className="ml-auto bg-blue-500 text-white px-6 py-1 rounded"
          >
            查询
          </button>
        </div>
      </form>
      <ResultTable loading={isTableLoading} data={queryResult} />
    </div>
  );
};

export default CarInsuranceRate;
