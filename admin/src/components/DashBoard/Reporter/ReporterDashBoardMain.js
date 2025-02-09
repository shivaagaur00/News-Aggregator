import React, { useState } from "react";
import ReporterSideBar from "./ReporterSideBar";
import ReporterHomeDashBoard from "./ReporterHomeDashBoard";
import RepAddPost from "./RepAddPost";
const ReporterDashBoardMain = () => {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <ReporterHomeDashBoard />;
      case 'addNews':
        return <RepAddPost />;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <div className="flex bg-gradient-to-b from-gray-900 to-gray-800 ">
      <div className="w-[20%] fixed top-0 left-0 h-screen bg-gray-900 shadow-md">
        <ReporterSideBar setActivePage={setActivePage} />
      </div>

      <div className="ml-[20%] w-[80%] h-screen bg-[#232323] overflow-y-auto">
      {renderPage()}
      </div>
    </div>
  );
};

export default ReporterDashBoardMain;
