import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import LoadingAnimation from "./Loader";
import { Favorite, FavoriteBorder, Share, ChatBubbleOutline } from "@mui/icons-material";
import { IconButton, TextField, Button } from "@mui/material";
import { useAppContext } from "../Context/ThemeContext";
import { initSocket } from "./WebSocket/socket";

const NewsCard = ({ newsId, author, title, description, date, images }) => {
  const { darkMode } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const socket = initSocket();

  useEffect(() => {
    socket.on("likeUpdated", (data) => {
      if (data.newsId === newsId) setLiked(data.liked);
    });
    socket.on("commentAdded", (data) => {
      if (data.newsId === newsId) setComments((prev) => [...prev, data.comment]);
    });
    return () => {
      socket.off("likeUpdated");
      socket.off("commentAdded");
    };
  }, [socket, newsId]);

  const handleImageLoad = () => setLoading(false);
  const handleError = () => setLoading(true);
  const toggleLike = () => {
    setLiked(!liked);
    socket.emit("newLike", { newsId, liked: !liked });
  };
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment = { user: "Anonymous", text: newComment };
      socket.emit("newComment", { newsId, comment });
      setNewComment("");
    }
  };

  const shortDescription = description?.length > 120 ? `${description.slice(0, 120)}...` : description || "No description available.";
  const shortTitle = title?.length > 40 ? `${title.slice(0, 40)}...` : title || "Untitled";
  const urlToImage = images[0];

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full flex justify-center cursor-pointer">
      <Tilt options={{ max: 8, scale: 1.01, speed: 400 }} className="tilt-card">
        <div className={`relative flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} bg-opacity-80 backdrop-blur-md border ${darkMode ? "border-gray-700" : "border-gray-200"} rounded-2xl shadow-lg overflow-hidden w-72 h-[30rem] transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}>
          <div className="w-full h-48 bg-gray-300 relative">
            {loading && <div className="absolute inset-0 flex items-center justify-center"><LoadingAnimation /></div>}
            <img src={urlToImage} alt="news" className="w-full h-full object-cover rounded-t-2xl" onLoad={handleImageLoad} onError={handleError} style={{ display: loading ? "none" : "block" }} />
          </div>
          <div className="p-4 flex flex-col justify-between flex-grow">
            <h3 className={`text-lg font-bold ${darkMode ? "text-white" : "text-black"} text-center mb-3`}>{shortTitle}</h3>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} text-center`}>{shortDescription}</p>
            <div className="text-xs text-center mt-3">
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}><strong className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>Author:</strong> {author || "Unknown"}</p>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}><strong className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}>Published:</strong> {new Date(date).toLocaleDateString() || "Unknown"}</p>
            </div>
            <div className="flex justify-around mt-4 border-t pt-3">
              <IconButton onClick={toggleLike}>{liked ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorder sx={{ color: darkMode ? "white" : "black" }} />}</IconButton>
              <IconButton><ChatBubbleOutline sx={{ color: darkMode ? "white" : "black" }} /></IconButton>
              <IconButton><Share sx={{ color: darkMode ? "white" : "black" }} /></IconButton>
            </div>
            <div className="mt-3 px-3">
              <TextField fullWidth variant="outlined" size="small" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
              <Button fullWidth variant="contained" color="primary" className="mt-2" onClick={handleCommentSubmit}>Comment</Button>
            </div>
            <div className="mt-3 px-3 max-h-20 overflow-y-auto">
              {comments.map((comment, index) => (
                <p key={index} className="text-sm text-gray-500 border-b py-1">{comment.user}: {comment.text}</p>
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

export default NewsCard;
