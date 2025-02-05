import React from "react";
import { useNewsContext } from "../../../context/context";

const Reports = () => {
  
  const { news} = useNewsContext();  
  console.log(news);
  return <div>Reports</div>;
};

export default Reports;
