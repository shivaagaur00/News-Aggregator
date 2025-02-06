import News from "../Models/news.js";
export const addReporter = async (req, res) => {
    try {
        console.log("jsk");
        const { uniqueId, password, name, email, aadharNumber, headQuarterLocation, photo} = req.body;
        if (!uniqueId || !password || !name || !email || !aadharNumber || !!headQuarterLocation || !photo) {
            return res.status(400).json({ message: "Required fields" });
        }
        const out = await News.findOne({ "name": "news" });
        if (!news) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const reporterData = {
            uniqueId,
            password,
            name,
            email,
            aadharNumber,
            headQuarterLocation,
            photo,
            nonApprovedNews:[],
            approvedNews:[],
            nonApproveVideo:[],
            approvedVideo:[],
        };
        news.reporters.push(reporterData);
        await news.save();
        res.status(201).json({ message: "News added successfully!", data: newsData });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
