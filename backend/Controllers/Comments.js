import News from "../Models/news.js";

export const likeNews = async (req, res) => {
  const { userId } = req.body;
  try {
    const newsItem = await News.findOne({ "approvedNews._id": req.params.id });

    if (!newsItem) return res.status(404).json({ message: "News not found" });

    let updatedNews = newsItem.approvedNews.map((news) => {
      if (news._id.toString() === req.params.id) {
        if (news.likes.includes(userId)) {
          news.likes = news.likes.filter((id) => id !== userId);
        } else {
          news.likes.push(userId);
        }
      }
      return news;
    });

    newsItem.approvedNews = updatedNews;
    await newsItem.save();
    res.json({ message: "Like updated", newsItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  const { user, text } = req.body;
  try {
    const newsItem = await News.findOne({ "approvedNews._id": req.params.id });

    if (!newsItem) return res.status(404).json({ message: "News not found" });

    let updatedNews = newsItem.approvedNews.map((news) => {
      if (news._id.toString() === req.params.id) {
        news.comments.push({ user, text });
      }
      return news;
    });

    newsItem.approvedNews = updatedNews;
    await newsItem.save();
    res.json({ message: "Comment added", newsItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
