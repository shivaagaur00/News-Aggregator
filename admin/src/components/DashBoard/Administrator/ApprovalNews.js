import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApprovalNewsCard from "./Card/ApprovalNewsCard";
import { useNewsContext } from "../../../context/context";
import { approveNews } from "../../../API/AdministratorLogin";

const ApprovalNews = () => {
  const { id } = useParams();
  const { news } = useNewsContext();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    if (news && news.nonApprovedNews) {
      setNewsList(news.nonApprovedNews);
    }
  }, [news]);

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

  return (
    <div className="flex flex-col items-center min-h-screen p-5 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <h1 className="text-blue-400 text-4xl md:text-5xl font-bold mb-8 mt-4">
        Approve or Reject News Articles
      </h1>
      {newsList.length === 0 ? (
        <p className="text-xl text-gray-300">No pending news for approval.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
          {newsList.map(({ newsID, reporterID, ...newsItem }) => (
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
