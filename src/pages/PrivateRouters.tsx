import { URLS } from "@/shared/constant/urls";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Users = React.lazy(() => import("@/pages/Users"));
const Partners = React.lazy(() => import("@/pages/Partners"));

const PrivateRouters = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Users />}></Route>
        <Route path={URLS.PARTNERS} element={<Partners />}></Route>
      </Routes>
    </>
  );
};

export default PrivateRouters;
