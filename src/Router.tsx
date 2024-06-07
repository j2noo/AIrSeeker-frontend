import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import LoginPath from "./pages/login/LoginPath";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPath />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
