import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import Layout from "./components/layout/Layout";

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
