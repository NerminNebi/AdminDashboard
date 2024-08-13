import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Users = React.lazy(() => import("@/pages/Users"));

const PrivateRouters = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Users />}></Route>
      </Routes>
    </>
  );
};

export default PrivateRouters;
