import { Checkbox, DatePicker, Divider, Select, Space } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import "dayjs/locale/zh-cn";
import React, { useState } from "react";
import {
  fakeData1,
  mockBranchOptions,
  mockCompanyOptions,
} from "../../mock/mockData";
import { buttonStyle, queryInputStyle } from "../../utils/styles";
import AddModal from "./AddModal";
import ResultTable from "./ResultTable";
const { RangePicker } = DatePicker;

const UnderwritingRules = () => {
  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);
  const [isEveryBranchSelected, setIsEveryBranchSelected] = useState(false);
  const [queryConditions, setQueryConditions] = useState({
    company: [],
    branch: [],
    publishedPeriod: [],
    title: "",
  });
  const [queryResult, setQueryResult] = useState([]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const handleQuery = (e) => {
    e.preventDefault();
    setIsTableLoading(true);
    console.log(queryConditions);
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
          <label htmlFor="insurance-company">保险公司</label>
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
        <div className="flex gap-8 lg:gap-12">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 py-1">
              <label htmlFor="insurance-name">标&emsp;&emsp;题</label>
              <input
                className={queryInputStyle}
                type="text"
                onChange={(e) => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    title: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          {/* Right */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="start-selling">发布时间</label>
              <RangePicker
                style={{ flex: 1 }}
                locale={locale}
                onChange={(value) => {
                  const period = value?.map((_) => _.format("YYYY-MM-DD"));
                  setQueryConditions((pre) => ({
                    ...pre,
                    publishedPeriod: period,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex items-center gap-2">
          <label htmlFor="branch">分支机构</label>
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

        <div className="flex pt-2">
          <button
            className={buttonStyle}
            onClick={(e) => {
              e.preventDefault();
              setIsAddModalVisible(true);
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
      <AddModal
        visibility={isAddModalVisible}
        setIsModalVisible={setIsAddModalVisible}
        // getRules={getRules}
      />
    </div>
  );
};

export default UnderwritingRules;
