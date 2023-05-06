import { DatePicker, Space, Table, Tabs } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ExportRate, QueryRate } from "../../../../services/commision-rate";
import { GetParamNames } from "../../../../services/rate-param-name";
import RateViewModal from "../rate-information/RateViewModal";
const { RangePicker } = DatePicker;
import { toast } from "react-toastify";

const itemTitleStyle = "w-16 font-semibold text-gray-600";

const ViewInformation = ({ record, allCompanyNames, paramDiffNames }) => {
  const [commissionRate, setCommissionRate] = useState([]);
  const [rateParamNames, setRateParamNames] = useState([]);

  const [curRate, setCurRate] = useState({});

  const [isRateModalVisible, setIsRateModalVisible] = useState(false);

  const [activeKey, setActiveKey] = useState("1");

  const {
    insurId,
    companyId,
    code,
    mainOrVice,
    insurType,
    insurFullName,
    insurShortName,
    paramDiffNameId,
    startSaleTime,
    stopSaleTime,
    remark,
    commonYear,
  } = record;

  const commonYear_columns = [
    {
      title: "年期/分档",
      dataIndex: "year",
      width: 100,
    },
    {
      title: "说明",
      dataIndex: "description",
      render: (record) => record.replace("null", ""),
    },
  ];

  const commissionRate_columns = [
    {
      title: "序号",
      dataIndex: "rateId",
      width: 50,
    },
    {
      title: "费率参数名称",
      dataIndex: "rateParamNameId",
      width: 150,
      render: (record) =>
        rateParamNames.filter((_) => _.id === +record)[0]?.rateName,
    },
    {
      title: "收/支",
      dataIndex: "inOut",
    },
    {
      title: "年期-起",
      dataIndex: "yearPeriodStart",
    },
    {
      title: "年期-迄",
      dataIndex: "yearPeriodEnd",
    },
    {
      title: "计绩开始",
      dataIndex: "validateDateStart",
    },
    {
      title: "计绩结束",
      dataIndex: "validateDateEnd",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="text-blue-500"
            onClick={() => {
              setIsRateModalVisible(true);
              setCurRate(record);
            }}
          >
            查看
          </a>
        </Space>
      ),
    },
  ];

  const handleRateModalCancel = () => {
    setIsRateModalVisible(false);
  };

  const handleExport = () => {
    ExportRate().then((res) => {
      toast.success("导出成功!");
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  useEffect(() => {
    GetParamNames().then((res) => {
      setRateParamNames(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (activeKey === "2") {
      QueryRate(insurId).then((res) => {
        setCommissionRate(res.data.data);
      });
    }
  }, [activeKey]);

  const items = [
    {
      key: "1",
      label: "险种明细",
      children:
        activeKey === "1" ? (
          <div className="flex flex-col gap-2 mx-2 -mt-2 mb-4">
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>保险公司</p>
              <p>
                {allCompanyNames.filter((_) => _.value === companyId)[0]
                  ?.label || ""}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>主&ensp;/附约</p>
              <p>{mainOrVice}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>险种代码</p>
              <p>{code}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle} p>
                险种类别
              </p>
              <p>{insurType}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>险种全称</p>
              <p>{insurFullName}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>险种简称</p>
              <p>{insurShortName}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>参数区别</p>
              <p>
                {
                  paramDiffNames.filter((_) => _.value === +paramDiffNameId)[0]
                    ?.name
                }
              </p>
            </div>
            <Table
              columns={commonYear_columns}
              dataSource={commonYear}
              pagination={false}
              title={() => <p className="font-semibold">交费年期一览表</p>}
              size="small"
            />
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>销售期间</p>
              <RangePicker
                defaultValue={[dayjs(startSaleTime), dayjs(stopSaleTime)]}
                style={{ flex: 1 }}
                disabled
              />
            </div>
            <div className="flex gap-2 items-center">
              <p className={itemTitleStyle}>备&emsp;&emsp;注</p>
              <p>{remark}</p>
            </div>
          </div>
        ) : null,
    },
    {
      key: "2",
      label: "核佣费率列表",
      children:
        activeKey === "2" ? (
          <>
            <button
              disabled={!commissionRate.length}
              className={
                "-mt-4 ml-3 mb-2 px-3 py-1 border-solid border-[1.5px] rounded transition-all duration-100 border-transparent bg-blue-500 text-white hover:bg-blue-500/90 disabled:bg-slate-400/50 disabled:cursor-not-allowed"
              }
              onClick={handleExport}
            >
              全部导出
            </button>
            <Table
              className="mb-4"
              rowKey={"rateId"}
              columns={commissionRate_columns}
              dataSource={commissionRate}
              pagination={false}
              size="small"
            />
          </>
        ) : null,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
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
      <RateViewModal
        curRate={curRate}
        rateParamNames={rateParamNames}
        visibility={isRateModalVisible}
        handleCancel={handleRateModalCancel}
      />
    </>
  );
};

export default ViewInformation;
