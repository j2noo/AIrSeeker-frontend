import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/tracking/Tracking";
import Layout from "./components/layout/Layout";
import LoginPath from "./pages/login/LoginPath";
import Home from "./pages/home/Home";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/tracking" element={<Main />} />
          <Route path="/login" element={<LoginPath />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
