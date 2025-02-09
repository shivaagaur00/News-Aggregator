import React, { useState } from "react";
import {
  Newspaper,
  Title,
  Description,
  Language,
  Tag,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNewsContext } from "../../../context/context";
import { RepPostAdd } from "../../../API/ReporterLogin";
const RepAddPost = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    newsID:"",
    author: "",
    title: "",
    description: "",
    country: "",
    tags: [""],
    categories: [],
    date: "",
    time: "",
    images: [],
    id:id,
});
const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
    "politics",
];
const { news } = useNewsContext();
const reporterR = news.reporters.find(reporter=> reporter.uniqueId === id);
// console.log(reporterR);
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      const newCategories = checked
        ? [...prevFormData.categories, value]
        : prevFormData.categories.filter((category) => category !== value);
      return { ...prevFormData, categories: newCategories };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    try {
      const uploadedImages = [];
      for (const file of files) {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", file);
        cloudinaryFormData.append("upload_preset", "ml_default");
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dthriaot4/image/upload",
          cloudinaryFormData
        );
        uploadedImages.push(cloudinaryResponse.data.secure_url);
        // console.log(uploadedImages);
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...uploadedImages],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  const handleTagChange = (e, index) => {
    const newTags = [...formData.tags];
    newTags[index] = e.target.value;
    setFormData({ ...formData, tags: newTags });
  };

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ""] });
  };
  const currentIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const [date, time] = currentIST.split(", ");
  const handleSubmit = async () => {
    if (!formData.images.length) {
        alert("Please upload at least one image.");
        return;
    }
        const dataToSubmit = {
            newsID: formData.newsID,
            Repid: `${id}`,
            author: formData.author,
            title: formData.title,
            country: reporterR.headQuarterLocation,
            tags: formData.tags,
            categories: formData.categories,
            
    date: formData.date || date,
    time: formData.time || time,  
            description: formData.description,
            images: formData.images,
            approvedBy: `${id}`,
        };

        const response = await RepPostAdd(dataToSubmit);
        if (response.data) {
            alert("News added successfully!");
            setFormData({
                newsID: "",
                author: "",
                title: "",
                description: "",
                images: [],
                country: reporterR.headQuarterLocation,
                date: "",
                time: "",
                tags: [""],
                categories: [],
            });
        }
         else {
          alert( response.response.data.message);
        }
      }
  return (
    <div className="flex justify-center items-center bg-gray-900 w-full min-h-screen p-8">
      <motion.div
        className="w-full max-w-4xl bg-gray-900 p-8 rounded-xl shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl text-blue-500 font-semibold text-center mb-6">
          Add News Article
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
          <div>
              <div className="flex items-center mb-2">
                <Title className="text-4xl text-blue-500 mr-3" />
                <label htmlFor="author" className="text-lg text-white">
                  News ID
                </label>
              </div>
              <input
                type="text"
                id="newsID"
                name="newsID"
                value={formData.newsID}
                onChange={handleChange}
                placeholder="Enter news author"
                className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Title className="text-4xl text-blue-500 mr-3" />
                <label htmlFor="author" className="text-lg text-white">
                  Author
                </label>
              </div>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter news author"
                className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <div className="flex items-center mb-2">
                <Title className="text-4xl text-blue-500 mr-3" />
                <label htmlFor="title" className="text-lg text-white">
                  Title
                </label>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter news title"
                className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Tag className="text-4xl text-red-400 mr-3" />
                <label className="text-lg text-white">Tags</label>
              </div>
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-3 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(e, index)}
                    placeholder={`Tag #${index + 1}`}
                    className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addTag}
                className="text-white mt-2 mb-3 bg-blue-500 p-2 rounded-lg shadow-lg"
              >
                Add Hashtag
              </button>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Newspaper className="text-4xl text-yellow-500 mr-3" />
                <label className="text-lg text-white">Categories</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-800 rounded-lg p-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      name="categories"
                      value={category}
                      checked={formData.categories.includes(category)}
                      onChange={handleCategoryChange}
                      className="w-5 h-5 text-blue-500 border-gray-600 rounded"
                    />
                    <label htmlFor={category} className="ml-2 text-white">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Description className="text-4xl text-green-500 mr-3" />
                <label htmlFor="description" className="text-lg text-white">
                  Description
                </label>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter news description"
                rows="14"
                className="w-full p-4 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <div
                className="w-full p-14 bg-gray-700 border-2 border-dashed border-gray-500 text-white rounded-lg text-center cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  setFormData({ ...formData, imageFile: file });
                }}
              >
                <p className="text-lg">Drag & Drop Image Here</p>
                <p className="text-sm text-gray-400">or</p>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                  className="hidden"
                />
                <label
                  htmlFor="imageFile"
                  className="text-blue-400 cursor-pointer"
                >
                  Choose a File
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="w-32 h-32">
                      <img
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleSubmit}
          className="w-full py-4 text-xl bg-green-600 text-white font-semibold rounded-lg shadow-md focus:outline-none mt-8"
        >
          Submit News
        </motion.button>
      </motion.div>
    </div>
  );
};

export default RepAddPost;


