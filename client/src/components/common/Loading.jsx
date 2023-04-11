import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="text-center my-48">
      <Spin tip="加载中..." />
    </div>
  );
};

export default Loading;
