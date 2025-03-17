import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import vid from "./../assets/vid1.mp4";
const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  const buttonVariants = {
    hover: { scale: 1.2 },
    tap: { scale: 0.95 },
  };
  return (
    <header className="flex items-center justify-between bg-slate-950 bg-opacity-90 backdrop-blur-lg text-white px-6 py-6 shadow-lg shadow-slate-600">
      <Link to={"/"}>
        <motion.div
          className="flex justify-center items-center gap-2 text-2xl font-bold cursor-pointer shadow-md shadow-slate-200 p-2 rounded-full"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <video
            src={vid}
            autoPlay
            loop
            muted
            className="w-16 h-auto rounded-full border-2 border-blue-200"
          ></video>
          Global Pulse
        </motion.div>
      </Link>
      <nav className="text-lg font-serif flex items-center space-x-2">
        <motion.div
          className="hover:text-blue-400 transition duration-300 bg-slate-900 pl-4 pr-4 pt-2 cursor-pointer shadow-md shadow-slate-400 pb-2 rounded-lg "
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Home
        </motion.div>
        <motion.div
          className="relative"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={(e) => e.stopPropagation()}
        ></motion.div>
        <motion.div
          className="relative"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={(e) => e.stopPropagation()}
        ></motion.div>
        <motion.button
          onClick={toggleTheme}
          className="text-white hover:text-blue-400 bg-slate-900 p-1 rounded-md transition duration-300 shadow-md shadow-slate-400 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {darkMode ? (
            <Brightness7 fontSize="large" />
          ) : (
            <Brightness4 fontSize="large" />
          )}
        </motion.button>
      </nav>
    </header>
  );
};

export default Header;
