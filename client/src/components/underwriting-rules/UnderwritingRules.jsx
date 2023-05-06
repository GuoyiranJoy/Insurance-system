import { Checkbox, DatePicker, Divider, Select, Space } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetBranch } from "../../services/branch";
import { GetCompany } from "../../services/company";
import { preProcessData } from "../../services/pre-process";
import { DeleteBatchRule, QueryRule } from "../../services/rule";
import { buttonStyle, queryInputStyle } from "../../utils/styles";
import ResultTable from "./ResultTable";
import AddModal from "./add-rule/AddModal";

const { RangePicker } = DatePicker;

const UnderwritingRules = () => {
  const [allCompanyOptions, setAllCompanyOptions] = useState([]);
  const [allBranchOptions, setAllBranchOptions] = useState([]);

  const [companyMap, setCompanyMap] = useState({});
  const [branchMap, setBranchMap] = useState({});

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);
  const [isEveryBranchSelected, setIsEveryBranchSelected] = useState(false);

  const [queryConditions, setQueryConditions] = useState({
    companyNames: [],
    branchNames: [],
    name: "",
  });
  const [queryResult, setQueryResult] = useState([]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [selectedRules, setSelectedRules] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRules(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedRules,
    onChange: onSelectChange,
  };

  useEffect(() => {
    const req1 = GetCompany();
    const req2 = GetBranch();

    axios.all([req1, req2]).then(
      axios.spread((res1, res2) => {
        setAllCompanyOptions(
          res1.data.data.map(({ companyId, companyName }) => ({
            value: companyId,
            label: companyName,
          }))
        );
        setCompanyMap(
          new Map(res1.data.data.map((obj) => [obj.companyId, obj.companyName]))
        );

        setAllBranchOptions(
          res2.data.data.map(({ branchId, branchName }) => ({
            value: branchId,
            label: branchName,
          }))
        );
        setBranchMap(
          new Map(res2.data.data.map((obj) => [obj.branchId, obj.branchName]))
        );
      })
    );
  }, []);

  const handleQuery = (fromAdd) => {
    if (
      !fromAdd &&
      (!queryConditions.companyNames || !queryConditions.companyNames.length)
    ) {
      toast.warn("请选择保险公司!");
      return;
    }
    setIsTableLoading(true);
    const con = {
      ...queryConditions,
      companyNames: queryConditions.companyNames?.map((_) => companyMap.get(_)),
      branchNames: queryConditions.branchNames?.map((_) => branchMap.get(_)),
    };
    const body = preProcessData(con);

    QueryRule(body)
      .then((res) => {
        setQueryResult(res.data.data);
      })
      .finally(() => {
        setIsTableLoading(false);
      });
  };

  const handleDeleteBatch = () => {
    DeleteBatchRule(selectedRules)
      .then(() => {
        toast.success("批量删除成功!");
        setSelectedRules([]);
        handleQuery();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectCompany = (value) => {
    setQueryConditions((pre) => ({ ...pre, companyNames: value }));
    if (value.length === allCompanyOptions.length) {
      setIsEveryCompanySelected(true);
    } else {
      setIsEveryCompanySelected(false);
    }
  };

  const handleSelectBranch = (value) => {
    setQueryConditions((pre) => ({ ...pre, branchNames: value }));
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
      setQueryConditions((pre) => ({
        ...pre,
        companyNames: all,
      }));
    } else {
      setIsEveryCompanySelected(false);
      setQueryConditions((pre) => ({
        ...pre,
        companyNames: [],
      }));
    }
  };

  const handleSelectAllBranches = (e) => {
    const all = allBranchOptions.map((item) => item.value);
    if (e.target.checked) {
      setIsEveryBranchSelected(true);
      setQueryConditions((pre) => ({
        ...pre,
        branchNames: all,
      }));
    } else {
      setIsEveryBranchSelected(false);
      setQueryConditions((pre) => ({
        ...pre,
        branchNames: [],
      }));
    }
  };

  return (
    <div className="pt-2 pb-2 pl-6 lg:pl-8 pr-10 lg:pr-12">
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
              options={allCompanyOptions}
              value={queryConditions.companyNames}
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
                    name: e.target.value,
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
                  const [from, to] =
                    value?.map((_) => _.format("YYYY-MM-DD")) || [];
                  setQueryConditions((pre) => ({
                    ...pre,
                    from: from,
                    to: to,
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
              options={allBranchOptions}
              value={queryConditions.branchNames}
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
            onClick={() => {
              setIsAddModalVisible(true);
            }}
          >
            新增一笔
          </button>
          <button
            disabled={!selectedRules.length}
            className={
              "mx-4 px-6 py-1 border-solid border-[1.5px] rounded transition-all duration-100 border-transparent bg-blue-500 text-white hover:bg-blue-500/90 disabled:bg-slate-400/50 disabled:cursor-not-allowed"
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
        loading={isTableLoading}
        data={queryResult}
        allCompanyOptions={allCompanyOptions}
        allBranchOptions={allBranchOptions}
        getRules={handleQuery}
      />
      {isAddModalVisible && (
        <AddModal
          visibility={isAddModalVisible}
          setIsModalVisible={setIsAddModalVisible}
          allCompanyOptions={allCompanyOptions}
          allBranchOptions={allBranchOptions}
          getRules={handleQuery}
        />
      )}
    </div>
  );
};

export default UnderwritingRules;
