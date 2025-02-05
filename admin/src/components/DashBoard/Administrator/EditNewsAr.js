import React, { useState, useEffect } from "react";
import { useNewsContext } from "../../../context/context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { deleteNewsApi, updateNewsApi } from "../../../API/EditNews.js";

const EditNewsAr = () => {
  const { id } = useParams();
  const { news,} = useNewsContext();
  const [selectedNews, setSelectedNews] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    country: "",
    tags: [],
    categories: [],
    date: "",
    time: "",
    images: [],
    approvedBy: "",
  });

  const handleSelectNews = (newsItem) => {
    setSelectedNews(newsItem);
    setFormData({
      title: newsItem.title || "",
      description: newsItem.description || "",
      author: newsItem.author || "",
      country: newsItem.country || "",
      tags: newsItem.tags || [],
      categories: newsItem.categories || [],
      date: newsItem.date ? newsItem.date.split("T")[0] : "",
      time: newsItem.time || "",
      images: newsItem.images || [],
      approvedBy: newsItem.approvedBy || id,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "tags" || name === "categories" ? value.split(", ") : value,
    }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const cloudinaryFormData = new FormData();
        cloudinaryFormData.append("file", file);
        cloudinaryFormData.append("upload_preset", "ml_default");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dthriaot4/image/upload",
          cloudinaryFormData
        );

        return response.data.secure_url;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...uploadedImages],
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: prevFormData.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit =async ()=> {
    if (!formData.images.length) {
            alert("Please upload at least one image.");
            return;
        }
            const dataToSubmit = {
                newsID: selectedNews.newsID,
                id: `${id}`,
                author: formData.author,
                title: formData.title,
                country: formData.country,
                tags: formData.tags,
                categories: formData.categories,
                date: formData.date,
                time: formData.time,
                description: formData.description,
                images: formData.images,
                approvedBy: `${id}`,
            };
    
            const response = await updateNewsApi(dataToSubmit);
            if (response.data) {
                alert("News added successfully!");
                setFormData({
                    newsID: "",
                    author: "",
                    title: "",
                    description: "",
                    images: [],
                    country: "",
                    date: "",
                    time: "",
                    tags: [""],
                    categories: [],
                });
            }
             else {
              alert( response.response.data.message);
            }
    };

  const handleDelete = async() => {
    if (selectedNews) {
      const response=await deleteNewsApi({newsID:selectedNews.newsID,id:selectedNews.approvedBy});
      if(response.data){
        alert("Deleted");
      }
    }

  };

  const resetForm = () => {
    setSelectedNews(null);
    setFormData({
      author: "",
      title: "",
      description: "",
      images: [],
      country: "",
      date: "",
      time: "",
      tags: [],
      categories: [],
      approvedBy: id,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex w-full max-w-4xl mx-auto p-6 rounded-lg shadow-xl bg-gray-800 flex-grow">
        <div className="w-1/2 p-4 border-r">
          <h2 className="text-2xl text-blue-500 font-semibold mb-4">All News</h2>
          <ul>
            {news.approvedNews.map((item) => (
              <li
                key={item.newsID}
                className="p-4 mb-4 cursor-pointer bg-gray-900 hover:bg-gray-800 rounded-xl border border-gray-700 shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center gap-6"
                onClick={() => handleSelectNews(item)}
              >
                {item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt="News"
                    className="w-20 h-20 object-cover rounded-lg shadow-md border border-gray-700"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white leading-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full p-6 bg-gray-800 rounded-lg shadow-xl flex-grow">
          {selectedNews ? (
            <>
              <h2 className="text-3xl font-semibold text-white mb-6 text-center">Edit News</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Title"
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Author</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      placeholder="Author"
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Tags (comma-separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags.join(", ")}
                      onChange={handleChange}
                      placeholder="Tags"
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400">Categories (comma-separated)</label>
                    <input
                      type="text"
                      name="categories"
                      value={formData.categories.join(", ")}
                      onChange={handleChange}
                      placeholder="Categories"
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400">Approved By</label>
                    <input
                      type="text"
                      name="approvedBy"
                      value={formData.approvedBy}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="w-full p-10 bg-gray-700 border-2 border-dashed border-gray-500 text-white rounded-lg text-center cursor-pointer">
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
                  <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative w-full h-32 overflow-hidden rounded-lg border border-gray-600">
                        <img
                          src={image}
                          alt={`Uploaded ${index + 1}`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs shadow-md hover:bg-red-700 transition"
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete News
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-white">Please select a news item to edit.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditNewsAr;
