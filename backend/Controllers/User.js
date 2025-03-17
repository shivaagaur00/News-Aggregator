import News from "../Models/news.js";
export const getNewsData = async (req, res) => {
  try {
    let news = await News.findOne({ name: "news" });
    if (!news) {
      return res.status(404).json({ message: "news not found" });
    }
    return res
      .status(200)  
      .json({ message: "Fetched Successfully", news: news });
  } catch (error) {
    return res.status(500).json({ message: "Some error occurred" });
  }
};
export const UserLogin = async (req, res) => {
  const { id, password } = req.body;
  console.log(id);
  if (!id || !password) {
    return res.status(400).json({ message: "Id and Password are required" });
  }
  console.log(id);
  try {
    let news = await News.findOne({ name: "news" });
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    
    let userDetails = news.users.find((user) => user.id === id);
    if (!userDetails || userDetails.password !== password) {
      return res.status(401).json({ message: "Password mismatch" });
    }
    const userResponse = {
      id: userDetails.id,
      name: userDetails.name,
      likedPosts: userDetails.LikedPost,
      commentedPosts: userDetails.CommentedPosts,
    };
    res.status(200).json({ message: "Login successful", user: userResponse });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const UserSignup = async (req, res) => {
  const { id, password, name, country } = req.body;
  if (!id || !password || !name || !country) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let news = await News.findOne({ name: "news" });

    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    const existingUser = news.users.find((user) => user.id === id);
    if (existingUser) {
      return res.status(400).json({ message: "User with this ID already exists" });
    }

    const newUser = {
      id,
      password,
      name,
      country,
      LikedPost: [],
      CommentedPosts: [],
    };

    if (!Array.isArray(news.users)) {
      news.users = [];
    }

    news.users.push(newUser);
    await news.save();
    res.status(201).json({ message: "User created successfully", user: newUser });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "User ID must be unique" });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
