import { Checkbox, DatePicker, Divider, Select, Space } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";
import { mockCompanyOptions } from "../../../mock/mockData";
import {
  companyTypeOptions,
  masterOptions,
  paramsDiffOptions,
  sellingOptions,
} from "../../../utils/options";
import {
  buttonStyle,
  queryInputStyle,
  querySelectStyle,
} from "../../../utils/styles";
import AddModal from "./AddModal";
import ExportModal from "./ExportModal";
import ExportRateModal from "./ExportRateModal";
import ResultTable from "./ResultTable";
import { generateConditions as generateCondition } from "./services";
const { RangePicker } = DatePicker;

const ManageAgency = () => {
  const [includedConditions, setIncludedConditions] = useState({
    isNameIncluded: false,
    isCodeIncluded: false,
    isSellingStatusIncluded: false,
    isMasterIncluded: false,
    isParamsDiffIncluded: false,
    isSellingStartPeriodIncluded: false,
    isSellingEndPeriodIncluded: false,
  });

  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isExportRateModalVisible, setIsExportRateModalVisible] =
    useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);
  const [queryConditions, setQueryConditions] = useState({
    companyType: 1,
    company_name: [],
    insurance_cname: "",
    code: "",
    sellingStatus: 1,
    main_or_vice: 1,
    paramsDiff: 1,
    start_sale_time: [],
    stop_sale_time: [],
  });

  const [queryResult, setQueryResult] = useState([]);

  const handleQuery = (e) => {
    e?.preventDefault();
    setIsTableLoading(true);
    const condition = generateCondition(queryConditions, includedConditions);
    axios({
      method: "get",
      url: `http://localhost:8080/insurance?${condition}`,
    }).then((res) => {
      setQueryResult(res.data);
      setIsTableLoading(false);
    });
  };

  const handleSelectCompany = (value) => {
    setQueryConditions((pre) => ({ ...pre, company_name: value }));
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
      setQueryConditions((pre) => ({
        ...pre,
        company_name: all,
      }));
    } else {
      setIsEveryCompanySelected(false);
      setQueryConditions((pre) => ({
        ...pre,
        company_name: [],
      }));
    }
  };

  const getInsurance = () => {
    axios({
      method: "get",
      url: `http://localhost:8080/insurance`,
    }).then((res) => {
      setQueryResult(res.data);
      setIsTableLoading(false);
    });
  };

  return (
    <div className="pt-2 pb-2 pl-6 lg:pl-8 pr-10 lg:pr-12">
      {/* Query */}
      <form className="w-full py-4 pb-8 gap-4 flex flex-col justify-between">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <label htmlFor="insurance-company">
            保险公司
            <input type="checkbox" id="insurance-company" checked disabled />
          </label>
          <select
            onChange={(e) => {
              setQueryConditions((pre) => ({
                ...pre,
                companyType: +e.target.value,
                company_name: +e.target.value <= 2 ? [] : pre.company_name,
              }));
            }}
            className="py-0.5 rounded border-solid border-[1px] border-[#D9D9D9]"
          >
            {companyTypeOptions.map(({ value, name }) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
          <Space
            style={{
              flex: "1",
            }}
            direction="vertical"
          >
            <Select
              disabled={queryConditions.companyType <= 2}
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              maxTagCount={7}
              placeholder="请选择保险公司"
              onChange={handleSelectCompany}
              options={mockCompanyOptions}
              value={queryConditions.company_name}
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

        {/* Row 2~4 */}
        <div className="flex gap-8 lg:gap-12">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="insurance_cname">
                险种名称
                <input
                  type="checkbox"
                  name="insurance_cname"
                  id="insurance_cname"
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
                    insurance_cname: e.target.value,
                  }));
                }}
              />
              <button
                className="disabled:cursor-not-allowed"
                disabled={!includedConditions.isNameIncluded}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <HiXMark />
              </button>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 flex gap-2">
                <label htmlFor="selling">
                  是否停售
                  <input
                    type="checkbox"
                    id="selling"
                    onChange={() => {
                      setIncludedConditions((pre) => ({
                        ...pre,
                        isSellingStatusIncluded: !pre.isSellingStatusIncluded,
                      }));
                    }}
                  />
                </label>
                <select
                  onChange={(e) => {
                    setQueryConditions((pre) => ({
                      ...pre,
                      sellingStatus: +e.target.value,
                    }));
                  }}
                  className={`${querySelectStyle}  flex-1`}
                  disabled={!includedConditions.isSellingStatusIncluded}
                >
                  {sellingOptions.map(({ value, name }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex gap-2">
                <label htmlFor="main_or_vice">
                  &emsp;主附约
                  <input
                    type="checkbox"
                    id="main_or_vice"
                    onChange={() => {
                      setIncludedConditions((pre) => ({
                        ...pre,
                        isMasterIncluded: !pre.isMasterIncluded,
                      }));
                    }}
                  />
                </label>
                <select
                  onChange={(e) => {
                    setQueryConditions((pre) => ({
                      ...pre,
                      main_or_vice: +e.target.value,
                    }));
                  }}
                  className={`${querySelectStyle}  flex-1`}
                  disabled={!includedConditions.isMasterIncluded}
                >
                  {masterOptions.map(({ value, name }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <label htmlFor="params-diff">
                参数区别
                <input
                  type="checkbox"
                  id="params-diff"
                  onChange={() => {
                    setIncludedConditions((pre) => ({
                      ...pre,
                      isParamsDiffIncluded: !pre.isParamsDiffIncluded,
                    }));
                  }}
                />
              </label>
              <select
                onChange={(e) => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    paramsDiff: +e.target.value,
                  }));
                }}
                className={`${querySelectStyle}  flex-1`}
                disabled={!includedConditions.isParamsDiffIncluded}
              >
                {paramsDiffOptions.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Right */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 flex items-center gap-2">
              <label htmlFor="insurance-code">
                险种代码
                <input
                  type="checkbox"
                  id="insurance-code"
                  onChange={() => {
                    setIncludedConditions((pre) => ({
                      ...pre,
                      isCodeIncluded: !pre.isCodeIncluded,
                    }));
                  }}
                />
              </label>
              <input
                className={queryInputStyle}
                type="text"
                disabled={!includedConditions.isCodeIncluded}
                onKeyUp={(e) => {
                  e.target.value = e.target.value.replace(/[^\w]/gi, "");
                }}
                onChange={(e) => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    code: e.target.value,
                  }));
                }}
              />
              <button
                className="disabled:cursor-not-allowed"
                disabled={!includedConditions.isCodeIncluded}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <HiXMark />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="start-selling">
                启售期间
                <input
                  type="checkbox"
                  id="start-selling"
                  onChange={() => {
                    setIncludedConditions((pre) => ({
                      ...pre,
                      isSellingStartPeriodIncluded:
                        !pre.isSellingStartPeriodIncluded,
                    }));
                  }}
                />
              </label>
              <RangePicker
                disabled={!includedConditions.isSellingStartPeriodIncluded}
                style={{ flex: 1 }}
                onChange={(value) => {
                  const period = value?.map((_) => _.format("YYYY-MM-DD"));
                  setQueryConditions((pre) => ({
                    ...pre,
                    start_sale_time: period,
                  }));
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="stop-selling">
                停售期间
                <input
                  type="checkbox"
                  id="stop-selling"
                  onChange={() => {
                    setIncludedConditions((pre) => ({
                      ...pre,
                      isSellingEndPeriodIncluded:
                        !pre.isSellingEndPeriodIncluded,
                    }));
                  }}
                />
              </label>
              <RangePicker
                disabled={!includedConditions.isSellingEndPeriodIncluded}
                style={{ flex: 1 }}
                onChange={(value) => {
                  const period = value?.map((_) => _.format("YYYY-MM-DD"));
                  setQueryConditions((pre) => ({
                    ...pre,
                    stop_sale_time: period,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex pt-2 gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsExportModalVisible(true);
            }}
            className={`${buttonStyle} flex gap-1 items-center`}
          >
            <BiArrowFromBottom />
            <p>导出险种Excel</p>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsAddModalVisible(true);
            }}
            className={buttonStyle}
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
      <ResultTable
        data={queryResult}
        loading={isTableLoading}
        getInsurance={handleQuery}
      />
      <ExportModal
        visibility={isExportModalVisible}
        setIsModalVisible={setIsExportModalVisible}
        results={queryResult}
      />
      <ExportRateModal
        visibility={isExportRateModalVisible}
        setIsModalVisible={setIsExportRateModalVisible}
        results={queryResult}
      />
      <AddModal
        visibility={isAddModalVisible}
        setIsModalVisible={setIsAddModalVisible}
        getInsurance={getInsurance}
      />
    </div>
  );
};

export default ManageAgency;
