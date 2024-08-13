import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "@/redux/store";

import { URLS } from "@/shared/constant/urls";
import RenderIf from "@/shared/components/RenderIf";
import Layout from "@/shared/layout";
import PrivateRouters from "./PrivateRouters";

const Login = lazy(() => import("@/pages/Login"));

const Router = () => {
  const { token } = useAppSelector((state) => state.auth);

  return (
    <>
      <Suspense fallback={<h2>Loading all roots...</h2>}>
        <RenderIf condition={token}>
          <Layout>
            <PrivateRouters />
          </Layout>
        </RenderIf>
        <RenderIf condition={!token}>
          <Routes>
            <Route path="*" element={<Navigate to={URLS.LOGIN} />} />
            <Route path={URLS.LOGIN} element={<Login />} />
          </Routes>
        </RenderIf>
      </Suspense>
    </>
  );
};
export default Router;
