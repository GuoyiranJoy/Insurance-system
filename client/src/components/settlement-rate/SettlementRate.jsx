import React from "react";
import { ProfileOutlined, PartitionOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import ParamsDiff from "./ParamsDiff";
import RateParamsName from "./RateParamsName";

const items = [
  { name: "参数区别", Icon: PartitionOutlined, Children: ParamsDiff },
  { name: "费率参数名称", Icon: ProfileOutlined, Children: RateParamsName },
];

const SettlementRate = () => {
  return (
    <div className="pt-2 pb-2 pl-6 lg:pl-8 pr-10 lg:pr-12">
      <Tabs
        defaultActiveKey="1"
        items={items.map(({ name, Icon, Children }, i) => {
          return {
            label: (
              <span>
                <Icon />
                {name}
              </span>
            ),
            key: i,
            children: <Children />,
          };
        })}
      />
    </div>
  );
};

export default SettlementRate;
