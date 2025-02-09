import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApprovalNewsCard from "./Card/ApprovalNewsCard";
import { useNewsContext } from "../../../context/context";
import { approveNews } from "../../../API/AdministratorLogin";

const ApprovalNews = () => {
  const { id } = useParams();
  const { news } = useNewsContext();
  const [newsList, setNewsList] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filters, setFilters] = useState({ country: "", tag: "", category: "", date: "", search: "" });

  useEffect(() => {
    if (news && news.nonApprovedNews) {
      setNewsList(news.nonApprovedNews);
      setFilteredNews(news.nonApprovedNews);
    }
  }, [news]);

  useEffect(() => {
    let filtered = newsList.filter((newsItem) => {
      const formatStoredDate = (dateStr) => {
        const [month, day, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };

      return (
        (filters.country ? newsItem.country.toLowerCase().includes(filters.country.toLowerCase()) : true) &&
        (filters.tag ? newsItem.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase())) : true) &&
        (filters.category ? newsItem.categories.some(category => category.toLowerCase().includes(filters.category.toLowerCase())) : true) &&
        (filters.date ? formatStoredDate(newsItem.date) === filters.date : true) &&
        (filters.search ? (newsItem.title.toLowerCase().includes(filters.search.toLowerCase())) : true)
      );
    });
    setFilteredNews(filtered);
  }, [filters, newsList]);

  const handleDecision = async (newsID, reporterID, status) => {
    try {
      await approveNews({ newsID, reporterID, status, adminID: id });
      setNewsList(newsList.filter((newsItem) => newsItem.newsID !== newsID));
      alert(`News ID: ${newsID} has been ${status}.`);
    } catch (error) {
      console.error("Error updating news status:", error);
      alert("Failed to update news status. Try again.");
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-5 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <h1 className="text-blue-400 text-4xl md:text-5xl font-bold mb-6 mt-4">
        Approve or Reject News Articles
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl bg-gray-800 p-4 rounded-xl shadow-lg">
        <input
          type="text"
          name="search"
          placeholder="Search by Title or Content"
          value={filters.search}
          onChange={handleFilterChange}
          className="p-3 rounded bg-gray-700 text-white w-full"
        />
        <input
          type="text"
          name="country"
          placeholder="Filter by Country"
          value={filters.country}
          onChange={handleFilterChange}
          className="p-3 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="tag"
          placeholder="Filter by Tag"
          value={filters.tag}
          onChange={handleFilterChange}
          className="p-3 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          name="category"
          placeholder="Filter by Category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-3 rounded bg-gray-700 text-white"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-3 rounded bg-gray-700 text-white"
        />
      </div>
      
      {filteredNews.length === 0 ? (
        <p className="text-xl text-gray-300 mt-6">No pending news for approval.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mt-6">
          {filteredNews.map(({ newsID, reporterID, ...newsItem }) => (
            <ApprovalNewsCard
              key={newsID}
              news={newsItem}
              onApprove={() => handleDecision(newsID, reporterID, "accepted")}
              onReject={() => handleDecision(newsID, reporterID, "rejected")}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalNews;