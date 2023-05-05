import React, { useState } from "react";
import { Tabs } from "antd";

const AddInformation = () => {
  const [activeKey, setActiveKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "初始化",
      children: <></>,
    },
    {
      key: "2",
      label: "费率列表",
      children: <></>,
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

export default AddInformation;
