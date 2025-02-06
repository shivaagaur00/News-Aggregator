import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin } from "lucide-react";
import axios from "axios";
import { addReporterAPI } from "../../../API/addReporter";

const AddReporter = () => {
  const [formData, setFormData] = useState({
    uniqueId: "",
    password: "",
    name: "",
    email: "",
    aadhaarNumber: "",
    headQuarterLocation: "",
    photo: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        photo: uploadedImages[0],
      }));
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload images.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (formData) {
      const dataToSubmit = {
        uniqueId: formData.uniqueId,
        password: formData.password,
        name: formData.name,
        email: formData.name,
        aadhaarNumber: formData.aadhaarNumber,
        headQuarterLocation: formData.headQuarterLocation,
        photo: formData.photo,
      };
      const response= await addReporterAPI(dataToSubmit);
      if(response.data){
        alert("Added SuccessFully");
      }
      else{
        alert(response.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 w-full min-h-screen p-8">
      <motion.div
        className="w-full max-w-3xl bg-gray-800 p-10 rounded-xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl text-blue-500 font-semibold text-center mb-6">
          Add Reporter
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {[
            { label: "Unique ID", name: "uniqueId" },
            { label: "password", name: "password" },
            { label: "Name", name: "name" },
            { label: "Email", name: "email", type: "email" },
            { label: "Aadhaar Number", name: "aadhaarNumber" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="text-white block mb-2">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <div>
            <label className="text-white block mb-2">
              Headquarter Location
            </label>
            <div className="flex items-center">
              <MapPin className="text-green-500 w-6 h-6 mr-3" />
              <select
                name="headQuarterLocation"
                value={formData.headQuarterLocation}
                onChange={handleChange}
                className="w-full p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Location</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-white block mb-2">Upload Photo</label>
            <div className="flex items-center">
              <Camera className="text-yellow-500 w-6 h-6 mr-3" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded text-white font-bold transition"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit Reporter"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddReporter;
