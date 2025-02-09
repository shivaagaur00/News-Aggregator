import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import AdDashBoardMain from "./components/DashBoard/Administrator/AdDashBoardMain.js";
import ReporterDashBoardMain from "./components/DashBoard/Reporter/ReporterDashBoardMain.js";
import AdministratorLogin from "./components/Authentication/AdministratorLogin.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ReporterLogin from "./components/Authentication/ReporterLogin.js";
import NotFoundPage from "./components/NotFound.js";
import AuthenticationMain from "./components/Authentication/AuthenticatonMain.js";
import AdminContextProvider from "./components/Context/AdminContext.js";
import { useNewsContext } from "./context/context.js";
import { useEffect } from "react";
import { getNewsData } from "./API/newsData.js";

function App() {
  const { setNews } = useNewsContext();
  useEffect(() => {
    const fetchNewsData = async () => {
      let res = await getNewsData();
      const out = res.data.news;
      setNews(out);
    };
    fetchNewsData();
  }, [setNews]);
  return (
    <AdminContextProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />
          <Route path="/Administrator/:id" element={<AdDashBoardMain />} />
          <Route path="/Reporter/:id" element={<ReporterDashBoardMain />} />
          <Route
            path="/AdministratorLogin"
            element={
              <>
                <Header />
                <AdministratorLogin />
                <Footer />
              </>
            }
          />
          <Route
            path="/Authen"
            element={
              <>
                <Header />
                <AuthenticationMain />
                <Footer />
              </>
            }
          />
          <Route
            path="/ReporterLogin"
            element={
              <>
                <Header />
                <ReporterLogin />
                <Footer />
              </>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AdminContextProvider>
  );
}

export default App;
