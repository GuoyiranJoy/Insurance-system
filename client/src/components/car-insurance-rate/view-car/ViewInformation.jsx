import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { MdArrowRightAlt } from "react-icons/md";
import MyTag from "../../common/MyTag";
import { carRateColumns } from "../constant";

const itemTitleStyle = "w-16 py-1 pr-2 text-right font-semibold text-gray-600";

const ViewInformation = ({ curCar }) => {
  const {
    rateName,
    insurStarttime,
    insurEndtime,
    companyNameList,
    branchNameList,
    vehicleType,
    insurTypeName,
    commissionRateIn,
    commissionRateOut,
  } = curCar;

  const [rateList, setRateList] = useState([]);

  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    const list = [];
    let id = 1;
    for (let i = 0; i < companyNameList.length; i++) {
      for (let j = 0; j < branchNameList.length; j++) {
        list.push({
          id,
          insurTypeName,
          vehicleType,
          rateIn: commissionRateIn,
          rateOut: commissionRateOut,
          companyName: companyNameList[i],
          branchName: branchNameList[j],
        });
        id++;
      }
    }
    setRateList(list);
  }, []);

  const items = [
    {
      key: "1",
      label: "基本信息",
      children: (
        <div className="-mt-2 px-2">
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>名称</p>
            <p>{rateName}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>有效期</p>
            <p>{insurStarttime}</p>
            <MdArrowRightAlt className="mx-2 text-lg" />
            <p>{insurEndtime}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>保险公司</p>
            <div className="flex items-center">
              {companyNameList.map((_, index) => (
                <MyTag
                  key={`company ${index}`}
                  content={_}
                  bgColor={"bg-[#E6F4FF]"}
                  borderColor={"border-[#1F7CFF]"}
                  textColor={"text-[#1F7CFF]"}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>分支机构</p>
            <div className="flex items-center">
              {branchNameList.map((_, index) => (
                <MyTag
                  key={`branch ${index}`}
                  content={_}
                  bgColor={"bg-[#F6FFED]"}
                  borderColor={"border-[#52C41A]"}
                  textColor={"text-[#52C41A]"}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className={itemTitleStyle}>车型</p>
            <p>{vehicleType}</p>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: `费率列表-${insurTypeName}`,
      children: (
        <div className="-mt-4 mb-4">
          <Table
            columns={carRateColumns}
            dataSource={rateList}
            rowKey={"id"}
            pagination={false}
            scroll={{ x: 800, y: 300 }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
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
  );
};

export default ViewInformation;
