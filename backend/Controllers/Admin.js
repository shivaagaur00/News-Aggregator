import News from "../Models/news.js";
export const loginAdmin = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        const news = await News.findOne({ "administrator.id": name });
        if (!news) {
            return res.status(404).json({ message: "Admin not found. Please check the username." });
        }

        const admin = news.administrator.find((admin) => admin.id === name);

        if (!admin) {
            return res.status(404).json({ message: "Admin account does not exist." });
        }

        if (admin.password !== password) {
            return res.status(401).json({ message: "Incorrect password. Please try again." });
        }

        const out = [
            admin.approvedNews,
            admin.approvedNewsVid,
            admin.nonApprovedNews,
            admin.nonApprovedNewsVid,
            admin.reporters
        ];

        return res.status(200).json({ message: "Login successful", out });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};
    
export const adminPostAdd = async (req, res) => {
    try {
        const { newsID, id, author, title, country, tags, categories, date, time, description, images } = req.body;
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
        const admin = news.administrator.find((admin) => admin.id === id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found in the record" });
        }
        const existingNews = admin.approvedNews.find((newsItem) => newsItem.newsID === newsID);
        if (existingNews) {
            return res.status(300).json({ message: "News ID must be unique"});
        }
        const newsData = {
            newsID,
            author,
            title,
            country,
            tags,
            categories,
            date: date || new Date().toISOString(),
            time: time || new Date().toTimeString(),
            description,
            images: images || [],
            comments: [],
            likes: [],
            approvedBy: id,
        };
        admin.approvedNews.push(newsData);
        out.approvedNews.push(newsData);

        await news.save();
        await out.save();

        res.status(201).json({ message: "News added successfully!", data: newsData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

  
export const adminVidPostAdd = async (req, res) => {
    try {
        const { id,author, title, country, tags, categories, date, time, description, videos } = req.body;
        if (!id || !author || !title || !country || !description) {
            return res.status(400).json({ message: "Admin ID, title, country, and description are required fields." });
        }
        if (!Array.isArray(tags) || !Array.isArray(categories) || !Array.isArray(videos)) {
            return res.status(400).json({ message: "Tags, categories, and videos should be arrays." });
        }
        const news = await News.findOne({ "administrator.id": id });
        if (!news) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const admin = news.administrator.find((admin) => admin.id === id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found in the record" });
        }
        const newsData = {
            author,
            title,
            country,
            tags,
            categories,
            date: date || new Date().toISOString(),
            time: time || new Date().toTimeString(),
            description,
            videos: videos || [],
        };
        admin.approvedNewsVid.push(newsData);
        await news.save();
        res.status(201).json({ message: "News added successfully!", data: newsData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const addReporter = async (req, res) => {
    try {
        console.log("Adding reporter...");
        const { uniqueId, password, name, email, aadhaarNumber, headQuarterLocation, photo } = req.body;
        if (!uniqueId || !password || !name || !email || !aadhaarNumber || !headQuarterLocation || !photo) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const out = await News.findOne({ name: "news" });
        if (!out) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const reporterData = {
            uniqueId,
            password,
            name,
            email,
            aadhaarNumber,
            headQuarterLocation,
            photo,
            nonApprovedNews: [],
            approvedNews: [],
            nonApproveVideo: [],
            approvedVideo: [],
        };

        out.reporters.push(reporterData);
        await out.save();
        console.log("Reporter added:", reporterData);
        res.status(201).json({ message: "Reporter added successfully!", data: reporterData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const DecesionApproveDeclineNews = async (req, res) => {
    try {
      const { newsID, reporterID, status, adminID } = req.body;
    //   console.log(req.body);
      if (!newsID || !reporterID || !status || !adminID) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      const newsDB = await News.findOne({ name: "news" });
      if (!newsDB) {
        return res.status(404).json({ message: "News database not found." });
      }
  
      const newsItemIndex = newsDB.nonApprovedNews.findIndex(
        (news) => news.newsID === newsID
      );
      if (newsItemIndex === -1) {
        return res.status(404).json({ message: "News item not found." });
      }
  
      const newsItem = newsDB.nonApprovedNews[newsItemIndex];
      newsDB.nonApprovedNews.splice(newsItemIndex, 1);
  
      const admin = newsDB.administrator.find((admin) => admin.id === adminID);
      if (!admin) {
        return res.status(404).json({ message: "Administrator not found." });
      }
  
      const reporter = newsDB.reporters.find(
        (reporter) => reporter.uniqueId === reporterID
      );
      if (!reporter) {
        return res.status(404).json({ message: "Reporter not found." });
      }
  
      reporter.nonApprovedNews = reporter.nonApprovedNews.filter(
        (news) => news.newsID !== newsID
      );
    //   console.log(admin);
  
      if (status === "accepted") {
        const approvedNewsItem = { ...newsItem, approvedBy: adminID };
        newsDB.approvedNews.push(approvedNewsItem);
        admin.approvedNews.push(approvedNewsItem);
        reporter.approvedNews.push(approvedNewsItem);
      } else if (status === "rejected") {
        newsDB.rejectedNews.push(newsItem);
        admin.rejectedNews.push(newsItem);
        reporter.rejectedNews.push(newsItem);
      } else {
        return res.status(400).json({ message: "Invalid status value." });
      }
      await newsDB.save();
      res.status(200).json({ message: `News ID: ${newsID} has been ${status}.` });
    } catch (error) {
      console.error("Error updating news status:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  






















export const approveNews = async (req, res) => {
    try {
        const { id, newsId } = req.body;
        if (!id || !newsId) {
            return res.status(400).json({ message: "Admin ID and news ID are required." });
        }
        const news = await News.findOne({ "administrator.id": id });
        if (!news) {
            return res.status(404).json({ message: "Admin not found." });
        }

        const admin = news.administrator.find((admin) => admin.id === id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found in the record." });
        }
        const newsItemIndex = admin.nonApprovedNews.findIndex((newsItem) => newsItem.id === newsId);
        if (newsItemIndex === -1) {
            return res.status(404).json({ message: "News not found in non-approved news." });
        }
        const [approvedNewsItem] = admin.nonApprovedNews.splice(newsItemIndex, 1);
        admin.approvedNews.push(approvedNewsItem);
        admin.nonApprovedNews = admin.nonApprovedNews.filter((newsItem) => newsItem.id !== newsId);
        await news.save();
        res.status(200).json({ message: "News approved successfully!", data: approvedNewsItem });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const approveNewsVid = async (req, res) => {
    try {
        const { id, videoId } = req.body;

        if (!id || !videoId) {
            return res.status(400).json({ message: "Admin ID and video ID are required." });
        }

        const news = await News.findOne({ "administrator.id": id });
        if (!news) {
            return res.status(404).json({ message: "Admin not found." });
        }

        const admin = news.administrator.find((admin) => admin.id === id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found in the record." });
        }

        const videoItemIndex = admin.nonApprovedNewsVid.findIndex((videoItem) => videoItem.id === videoId);
        if (videoItemIndex === -1) {
            return res.status(404).json({ message: "Video not found in non-approved videos." });
        }

        const [approvedVideoItem] = admin.nonApprovedNewsVid.splice(videoItemIndex, 1);
        admin.approvedNewsVid.push(approvedVideoItem);
        admin.nonApprovedNewsVid = admin.nonApprovedNewsVid.filter((videoItem) => videoItem.id !== videoId);

        await news.save();
        res.status(200).json({ message: "Video approved successfully!", data: approvedVideoItem });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
