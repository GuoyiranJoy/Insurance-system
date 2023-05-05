import { Checkbox, Divider, Select, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetBranch } from "../../services/branch";
import { QueryCar } from "../../services/car";
import { GetCompany } from "../../services/company";
import { preProcessData } from "../../services/pre-process";
import { buttonStyle, queryInputStyle } from "../../utils/styles";
import ResultTable from "./ResultTable";
import AddModal from "./add-car/AddModal";

const CarInsuranceRate = () => {
  const [allCompanyOptions, setAllCompanyOptions] = useState([]);
  const [allBranchOptions, setAllBranchOptions] = useState([]);

  const [companyMap, setCompanyMap] = useState({});
  const [branchMap, setBranchMap] = useState({});

  const [isEveryCompanySelected, setIsEveryCompanySelected] = useState(false);
  const [isEveryBranchSelected, setIsEveryBranchSelected] = useState(false);
  const [queryConditions, setQueryConditions] = useState({
    companyNames: [],
    branchNames: [],
    rateName: "",
  });
  const [queryResult, setQueryResult] = useState([]);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const handleQuery = () => {
    setIsTableLoading(true);
    const con = {
      ...queryConditions,
      companyNames: queryConditions.companyNames?.map((_) => companyMap.get(_)),
      branchNames: queryConditions.branchNames?.map((_) => branchMap.get(_)),
    };
    const body = preProcessData(con);

    QueryCar(body)
      .then((res) => {
        setQueryResult(res.data.data);
      })
      .finally(() => {
        setIsTableLoading(false);
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
    const all = allCompanyOptions.map((item) => item.value);
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

        {/* Row 3 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 py-1">
            <label htmlFor="name">费率名称</label>
            <input
              className={queryInputStyle}
              type="text"
              onChange={(e) => {
                setQueryConditions((pre) => ({
                  ...pre,
                  rateName: e.target.value,
                }));
              }}
            />
          </div>
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
            type="submit"
            onClick={handleQuery}
            className="ml-auto bg-blue-500 text-white px-6 py-1 rounded"
          >
            查询
          </button>
        </div>
      </div>
      <ResultTable
        loading={isTableLoading}
        data={queryResult}
        allCompanyOptions={allCompanyOptions}
        allBranchOptions={allBranchOptions}
        getCars={handleQuery}
      />
      {isAddModalVisible && (
        <AddModal
          visibility={isAddModalVisible}
          setIsModalVisible={setIsAddModalVisible}
          allCompanyOptions={allCompanyOptions}
          allBranchOptions={allBranchOptions}
          getCars={handleQuery}
        />
      )}
    </div>
  );
};

export default CarInsuranceRate;
