import React from "react";
import { motion } from "framer-motion";
import { Home, LiveTv, Report } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddTaskIcon from "@mui/icons-material/AddTask";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
const AdSideBar = ({ setActivePage }) => {
  return (
    <motion.div
      className="bg-gray-900 h-screen border-r border-gray-700 shadow-lg"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 25 }}
    >
      <div className="text-white p-6">
        <motion.h1
          className="text-2xl font-semibold border-b border-gray-700 pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          MENU
        </motion.h1>

        <ul className="mt-6 space-y-4">
          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("home")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <Home className="mr-3 text-cyan-400" />
            Home
          </motion.li>

          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("liveFeed")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <LiveTv className="mr-3 text-teal-400" />
            Live Feed
          </motion.li>

          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("addNewsPhoto")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <AddCircleOutlineIcon className="mr-3 text-yellow-500" />
            Add News with Photos
          </motion.li>

          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("addNewsVid")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <AddCircleOutlineIcon className="mr-3 text-yellow-500" />
            Add News with Videos
          </motion.li>

          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("approveNews")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <AddTaskIcon className="mr-3 text-amber-500" />
            Approve / Decline News
          </motion.li>
          
          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("editNewsArticles")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <DesignServicesIcon className="mr-3 text-amber-500" />
            Edit / Delete News Article
          </motion.li>
          
          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("editNewsVid")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <DesignServicesIcon className="mr-3 text-amber-500" />
            Edit News / Delete Video
          </motion.li>

          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("addReporter")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <HowToRegIcon className="mr-3 text-green-400" />
            Add Reporter
          </motion.li>

          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => setActivePage("reports")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <Report className="mr-3 text-red-500" />
            Reports
          </motion.li>

          <motion.li
            className="flex items-center text-md hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-300"
            onClick={() => alert("Logout action!")}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <LogoutIcon className="mr-3 text-purple-500" />
            Logout
          </motion.li>
        </ul>
      </div>
    </motion.div>
  );
};

export default AdSideBar;
