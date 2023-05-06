import { Checkbox, DatePicker, Divider, Select, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
import { GetCompany } from "../../../services/company";
import {
  DeleteBatchInsurance,
  QueryInsurance,
} from "../../../services/insurance";
import { GetParamDiff } from "../../../services/param-diff";
import { preProcessData } from "../../../services/pre-process";
import { masterOptionsForQuery } from "../../../utils/options";
import {
  buttonStyle,
  queryInputStyle,
  querySelectStyle,
} from "../../../utils/styles";
import ExportModal from "./ExportModal";
import ResultTable from "./ResultTable";
import AddModal from "./add-information/AddModal";
const { RangePicker } = DatePicker;

const ManageAgency = () => {
  const [allCompanyNames, setAllCompanyNames] = useState([]);
  const [paramDiffNames, setParamDiffNames] = useState([]);

  const [isExportModalVisible, setIsExportModalVisible] = useState(false);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);

  const [queryConditions, setQueryConditions] = useState({
    companyIds: [],
  });

  const [queryResult, setQueryResult] = useState([]);

  const [selectedInsurance, setSelectedInsurance] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedInsurance(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedInsurance,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const req1 = GetCompany();
    const req2 = GetParamDiff();

    axios.all([req1, req2]).then(
      axios.spread((res1, res2) => {
        setAllCompanyNames(
          res1.data.data.map(({ companyId, companyName }) => ({
            value: companyId,
            label: companyName,
          }))
        );
        setParamDiffNames(
          [{ value: "全部", name: "全部" }].concat(
            res2.data.data.map(({ id, paramDiffName }) => ({
              value: id,
              name: paramDiffName,
            }))
          )
        );
      })
    );
  }, []);

  const handleQuery = (e, fromAdd) => {
    if (typeof fromAdd === "undefined") {
      if (!queryConditions.companyIds.length) {
        toast.warn("请选择保险公司!");
        return;
      }
    }
    setIsTableLoading(true);

    QueryInsurance(preProcessData(queryConditions))
      .then((res) => {
        setQueryResult(res.data.data);
      })
      .finally(() => {
        setIsTableLoading(false);
      });
  };

  const handleDeleteBatch = () => {
    DeleteBatchInsurance(selectedInsurance)
      .then(() => {
        toast.success("批量删除成功!");
        setSelectedInsurance([]);
        handleQuery();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectCompany = (value) => {
    setQueryConditions((pre) => ({
      ...pre,
      companyIds: value,
    }));
    if (value.length === allCompanyNames.length) {
      setIsEveryCompanySelected(true);
    } else {
      setIsEveryCompanySelected(false);
    }
  };

  const handleSelectAllCompanies = (e) => {
    const all = allCompanyNames.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryCompanySelected(true);
      setQueryConditions((pre) => ({
        ...pre,
        companyIds: all,
      }));
    } else {
      setIsEveryCompanySelected(false);
      setQueryConditions((pre) => ({
        ...pre,
        companyIds: [],
      }));
    }
  };

  return (
    <div className="pt-2 pb-2 pl-6 lg:pl-8 pr-10 lg:pr-12">
      {/* Query */}
      <div className="w-full py-4 pb-8 gap-4 flex flex-col justify-between">
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
              options={allCompanyNames}
              value={queryConditions.companyIds}
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
              <label htmlFor="insurFullName">险种全称</label>
              <input
                className={queryInputStyle}
                type="text"
                value={queryConditions.insurFullName}
                onChange={(e) => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    insurFullName: e.target.value.replace(/\s|\t/g, ""),
                  }));
                }}
              />
              <button
                onClick={() => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    insurFullName: "",
                  }));
                }}
              >
                <HiXMark />
              </button>
            </div>
            <div className="flex-1 flex items-center gap-4">
              <div className="flex-1 flex items-center gap-2">
                <label htmlFor="mainOrVice">&emsp;主附约</label>
                <select
                  onChange={(e) => {
                    const value =
                      e.target.value === "全部" ? undefined : e.target.value;

                    setQueryConditions((pre) => ({
                      ...pre,
                      mainOrVice: value,
                    }));
                  }}
                  className={`${querySelectStyle}  flex-1`}
                >
                  {masterOptionsForQuery.map(({ value, name }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-2">
              <label htmlFor="params-diff">参数区别</label>
              <select
                onChange={(e) => {
                  const value =
                    e.target.value === "全部" ? undefined : +e.target.value;

                  setQueryConditions((pre) => ({
                    ...pre,
                    paramDiffNameId: value,
                  }));
                }}
                className={`${querySelectStyle}  flex-1`}
              >
                {paramDiffNames.map(({ value, name }) => (
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
              <label htmlFor="insurance-code">险种代码</label>
              <input
                className={queryInputStyle}
                type="text"
                value={queryConditions.code}
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
                onClick={() => {
                  setQueryConditions((pre) => ({
                    ...pre,
                    code: "",
                  }));
                }}
              >
                <HiXMark />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="start-selling">启售期间</label>
              <RangePicker
                style={{ flex: 1 }}
                onChange={(value) => {
                  const [from, to] =
                    value?.map((_) => _.format("YYYY-MM-DD")) || [];
                  setQueryConditions((pre) => ({
                    ...pre,
                    startFrom: from,
                    startTo: to,
                  }));
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="stop-selling">停售期间</label>
              <RangePicker
                style={{ flex: 1 }}
                onChange={(value) => {
                  const period = value?.map((_) => _.format("YYYY-MM-DD"));
                  setQueryConditions((pre) => ({
                    ...pre,
                    stopFrom: period[0],
                    stopTo: period[1],
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex pt-2 gap-4">
          <button
            onClick={() => {
              setIsExportModalVisible(true);
            }}
            className={`${buttonStyle} flex gap-1 items-center`}
          >
            <BiArrowFromBottom />
            <p>导出所有险种</p>
          </button>
          <button
            onClick={() => {
              setIsAddModalVisible(true);
            }}
            className={buttonStyle}
          >
            新增一笔
          </button>
          <button
            disabled={!selectedInsurance.length}
            className={
              "px-6 py-1 border-solid border-[1.5px] rounded transition-all duration-100 border-transparent bg-blue-500 text-white hover:bg-blue-500/90 disabled:bg-slate-400/50 disabled:cursor-not-allowed"
            }
            onClick={handleDeleteBatch}
          >
            批量删除
          </button>
          <button
            type="submit"
            onClick={handleQuery}
            className="ml-auto bg-blue-500 text-white px-6 py-1 rounded"
          >
            查询
          </button>
        </div>
      </div>
      <ResultTable
        rowSelection={rowSelection}
        data={queryResult}
        allCompanyNames={allCompanyNames}
        paramDiffNames={paramDiffNames.slice(1)}
        loading={isTableLoading}
        getInsurance={handleQuery}
      />
      <ExportModal
        visibility={isExportModalVisible}
        setIsModalVisible={setIsExportModalVisible}
        allCompanyNames={allCompanyNames}
        paramDiffNames={paramDiffNames.slice(1)}
        results={queryResult}
      />
      <AddModal
        allCompanyNames={allCompanyNames}
        paramDiffNames={paramDiffNames.slice(1)}
        visibility={isAddModalVisible}
        setIsModalVisible={setIsAddModalVisible}
        getInsurance={handleQuery}
      />
    </div>
  );
};

export default ManageAgency;
