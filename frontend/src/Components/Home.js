import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { Announcement } from "@mui/icons-material";
import { useNewsContext } from "../context";
import Header from "./Header";
import { useAppContext } from "../Context/ThemeContext";
import { initSocket, listenToNewNews, disconnectSocket } from './WebSocket/socket';

const Home = () => {
  const itemsPerPage = 8;
  const { darkMode, toggleTheme, searchQuery } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const { news, updateNews } = useNewsContext();  
  const newsData = news.approvedNews;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);
  useEffect(() => {
    const socket = initSocket();
    listenToNewNews((newNewsItem) => {
      updateNews((prevNews) => ({
        ...prevNews,
        approvedNews: [newNewsItem, ...prevNews.approvedNews],
      }));
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  const filteredData = newsData.filter((newsItem) =>
    newsItem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={`w-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex flex-col items-center p-6 pt-0 min-h-screen mr-16 ml-16">
        <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        <div className="relative w-full bg-blue-50 shadow-xl rounded-2xl mb-16 p-4 pr-6 flex flex-col overflow-hidden border border-blue-200 backdrop-blur-lg">
          <div className="flex items-center gap-3 text-blue-600 text-xl font-bold">
            <Announcement className="text-blue-400 text-3xl animate-bounce ml-4" />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-200 text-transparent bg-clip-text">
              Breaking News
            </span>
          </div>
          <div className="relative w-full overflow-hidden rounded-full mt-2 border border-blue-300 bg-blue-50/60">
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-blue-100 via-transparent" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-blue-100 via-transparent" />

            <div className="whitespace-nowrap animate-marquee px-4 text-lg font-medium text-blue-700 flex">
              {currentItems.map((newsItem, index) => (
                <span key={index} className="inline-block mr-2 ml-2">
                  {newsItem.title} &nbsp;&nbsp; <span className="text-blue-600">|</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-14">
          {currentItems.length > 0 ? (
            currentItems.map((newsItem, index) => (
              <NewsCard key={index} {...newsItem} />
            ))
          ) : (
            <p className="text-black text-lg col-span-full text-center">
              No results found.
            </p>
          )}
        </div>

        {totalPages > 1 && currentItems.length > 0 && (
          <div className="join flex justify-center items-center gap-2 mt-4">
            <button
              className="join-item btn bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            {[1, 2, "...", totalPages - 1, totalPages].map((page, index) => (
              <button
                key={index}
                className={`join-item btn ${
                  currentPage === page ? "btn-primary bg-blue-600" : "bg-blue-300"
                } text-white hover:bg-blue-500`}
                onClick={() => typeof page === "number" && handlePageChange(page)}
                disabled={page === "..." }
              >
                {page}
              </button>
            ))}
            <button
              className="join-item btn bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
