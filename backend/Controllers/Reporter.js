import News from "../Models/news.js";
export const loginReporter= async(req,res)=>{
    const {uniqueId,password}=req.body;
    if(!uniqueId || !password){
        return res.status(400).json({message:"ID Password Required"});
    }
    try{
        const news=await News.findOne({"reporters.uniqueId":uniqueId});
        if(!news){
            return res.status(404).json({message:"Reporter notfound"});
        }
        const reporter=news.reporters.find((repoter)=>repoter.uniqueId==uniqueId);
        if(reporter.password !== password){
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", reporter });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const RepPostAdd = async (req, res) => {
    const { newsID, Repid, author, title, description, country, tags, categories, date, time, images } = req.body;

    if (!newsID || !author || !title || !description || !country || !tags || !categories || !date || !time || !images || !Repid) {
        return res.status(400).json({ message: "Missing Details" });
    }

    try {
        const newsData = {
            newsID,
            reporterID: Repid,
            author,
            title,
            description,
            country,
            tags,
            categories,
            date: date || new Date().toISOString(),
            time: time || new Date().toTimeString(),
            images: images || [],
            status: "pending",
            submittedAt: new Date(),
        };

        const news = await News.findOne({ "reporters.uniqueId": Repid });
        if (!news) {
            return res.status(404).json({ message: "Reporter not found" });
        }

        const reporter = news.reporters.find((rep) => rep.uniqueId === Repid);
        if (!reporter) {
            return res.status(404).json({ message: "Reporter not found within the news data" });
        }

        reporter.nonApprovedNews.push(newsData);
        news.nonApprovedNews.push(newsData);

        await news.save();

        res.status(201).json({ message: "News submitted for approval", newsData });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
