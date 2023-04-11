import { Checkbox, DatePicker, Divider, Select, Space } from "antd";
import React, { useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { mockCompanyOptions } from "../../../mock/mockData";
import {
  companyTypeOptions,
  insuranceOptions,
  insuranceTypeOptions,
  paramsDiffOptions,
  rateParamsOptions,
  sellingOptions,
  typeOrDiffsOptions,
  validOptions,
} from "../../../utils/options";
import {
  buttonStyle,
  queryInputStyle,
  querySelectStyle,
} from "../../../utils/styles";
const { RangePicker } = DatePicker;

const QueryImportAgency = () => {
  const [includedConditions, setIncludedConditions] = useState({
    isRateParamsIncluded: false,
    isFullNameIncluded: false,
    isSimpleNameIncluded: false,
    isCodeIncluded: false,
    isInsuranceTypeIncluded: false,
    isParamsDiffIncluded: false,
    isValidStartIncluded: false,
    isValidEndIncluded: false,
  });

  const [isEveryRateNameSelected, setIsEveryRateNameSelected] = useState(false);

  const [queryResult, setQueryResult] = useState([]);

  const [queryConditions, setQueryConditions] = useState({
    companyType: 1,
    company: [],
    rateParams: [],
    fullName: "",
    simpleName: "",
    code: "",
    insuranceType: 1,
    paramsDiff: 1,
    validStart: null,
    validEnd: null,
  });

  const handleQuery = (e) => {
    e.preventDefault();
    setIsTableLoading(true);
    console.log(queryConditions);
    const conditions = generateConditions(queryConditions, includedConditions);
    console.log(conditions);
    setTimeout(() => {
      setQueryResult(fakeData);
      setIsTableLoading(false);
    }, 1000);
  };

  const handleSelectRateParam = (value) => {
    setQueryConditions((pre) => ({ ...pre, company: value }));
    if (value.length === rateParamsOptions.length) {
      setIsEveryRateNameSelected(true);
    } else {
      setIsEveryRateNameSelected(false);
    }
  };

  const handleSelectAllRateParams = (e) => {
    const all = rateParamsOptions.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryRateNameSelected(true);
      setQueryConditions((pre) => ({
        ...pre,
        rateParams: all,
      }));
    } else {
      setIsEveryRateNameSelected(false);
      setQueryConditions((pre) => ({
        ...pre,
        rateParams: [],
      }));
    }
  };

  return (
    <div className="pt-2 pb-2 pl-6 lg:pl-8 pr-10 lg:pr-12">
      <form className="w-full py-4 pb-8 gap-4 flex flex-col justify-between">
        {/* Row 1 */}
        <div className="flex items-center gap-2">
          <label className="w-40 text-right" htmlFor="company">
            保险公司
            <input type="checkbox" id="company" checked disabled />
          </label>
          <select
            onChange={(e) => {
              setQueryConditions((pre) => ({
                ...pre,
                companyType: +e.target.value,
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

          <select
            className={`${querySelectStyle}  flex-1`}
            disabled={queryConditions.companyType <= 2}
            onChange={(e) => {
              setQueryConditions((pre) => ({
                ...pre,
                company: +e.target.value,
              }));
            }}
          >
            {mockCompanyOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {/* Row 2 */}
        <div className="flex items-center gap-2">
          <label className="w-40 text-right" htmlFor="rateParams">
            险种费率参数名称
            <input
              type="checkbox"
              id="rateParams"
              onChange={() => {
                setIncludedConditions((pre) => ({
                  ...pre,
                  isRateParamsIncluded: !pre.isRateParamsIncluded,
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
              disabled={!includedConditions.isRateParamsIncluded}
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              maxTagCount={6}
              placeholder="请选择险种费率参数名称"
              onChange={handleSelectRateParam}
              options={rateParamsOptions}
              value={queryConditions.rateParams}
              dropdownRender={(menu) => (
                <>
                  <div className="p-2 pt-1 cursor-pointer">
                    <Checkbox
                      checked={isEveryRateNameSelected}
                      onChange={handleSelectAllRateParams}
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
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label className="w-40 text-right" htmlFor="insurance">
                险种全称/简称/代码
                <input
                  type="checkbox"
                  name="insurance"
                  id="insurance"
                  onChange={() => {}}
                />
              </label>
              <select
                onChange={(e) => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    companyType: +e.target.value,
                  }));
                }}
                className="w-[10%] py-0.5 rounded border-solid border-[1px] border-[#D9D9D9]"
              >
                {insuranceOptions.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
              <input
                className={queryInputStyle}
                type="text"
                disabled={
                  !includedConditions.isFullNameIncluded &&
                  !includedConditions.isSimpleNameIncluded &&
                  !includedConditions.isCodeIncluded
                }
                onChange={(e) => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 flex gap-2">
                <label className="w-40 text-right" htmlFor="type">
                  险种类别/参数区别
                  <input
                    type="checkbox"
                    id="type"
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
                  className={`${querySelectStyle}  w-[10%]`}
                  disabled={!includedConditions.isSellingStatusIncluded}
                >
                  {typeOrDiffsOptions.map(({ value, name }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
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
                  {insuranceTypeOptions.map(({ value, name }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <label className="w-40 text-right" htmlFor="valid">
                费率有效期
                <input
                  type="checkbox"
                  id="valid"
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
                className={`${querySelectStyle} w-[10%]`}
                disabled={!includedConditions.isParamsDiffIncluded}
              >
                {validOptions.map(({ value, name }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </select>
              <DatePicker
                className="flex-1"
                disabled={!includedConditions.isParamsDiffIncluded}
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
            <p>查询结果导出Excel</p>
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
    </div>
  );
};

export default QueryImportAgency;
