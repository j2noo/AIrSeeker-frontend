import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPath from "./pages/login/LoginPath";
import Home from "./pages/home/Home";
import Tracking from "./pages/tracking/Tracking";
import Find from "./pages/find/Find";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/find" element={<Find />} />
          <Route path="/login" element={<LoginPath />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
