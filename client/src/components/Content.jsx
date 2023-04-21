import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import contentRouter from "../routes/contentRouter";
import Loading from "./common/Loading";
import Header from "./Header";
import Home from "./Home";

const Content = () => {
  return (
    <div className="flex-1 min-h-screen flex flex-col">
      <Header />
      <div className="bg-[#F0F1F4] flex-1 overflow-auto">
        <Routes>
          <Route index path="/" element={<Home />} />
          {contentRouter.map((item, i) => (
            <Route
              key={i}
              path={item.path}
              element={
                <Suspense fallback={<Loading />}>
                  <item.element />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Content;
