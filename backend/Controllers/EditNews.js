import News from "../Models/news.js";

export const updateNews = async (req, res) => {
  try {
    const { newsID,id,author,title,country,tags,categories,date,time, description,images,approvedBy} = req.body;
    console.log(newsID);
    if (!id || !author || !title || !country || !description) {
      return res.status(400).json({ message: "Admin ID, title, country, and description are required fields." });
  }
  if (!Array.isArray(tags) || !Array.isArray(categories) || (images && !Array.isArray(images))) {
    return res.status(400).json({ message: "Tags, categories, and images should be arrays." });
}
const out = await News.findOne({ "name": "news" });
const news = await News.findOne({ "administrator.id": id });
if (!news) {
    return res.status(404).json({ message: "Admin not found" });
}
    const updatedNews = news.approvedNews.find((article) => article.newsID === newsID);
    updatedNews.id = id || updatedNews.id;
    updatedNews.title = title || updatedNews.title;
    updatedNews.author = author || updatedNews.author;
    updatedNews.country = country || updatedNews.country;
    updatedNews.tags = tags || updatedNews.tags;
    updatedNews.categories = categories || updatedNews.categories;
    updatedNews.date = date || updatedNews.date;
    updatedNews.time = time || updatedNews.time;
    updatedNews.description = description || updatedNews.description;
    updatedNews.images = images || updatedNews.images;
    await news.save();
    res.status(200).json({ message: "News article updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { newsID,id } = req.body;
    const news = await News.findOne({ "administrator.id": id });
    console.log(news);
    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }
    news.approvedNews = news.approvedNews.filter((article) => article.newsID !== newsID);
    await news.save();
    res.status(200).json({ message: "News article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
