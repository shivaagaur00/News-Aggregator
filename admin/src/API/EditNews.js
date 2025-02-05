import axios from "axios";
const URL = "http://localhost:8000";
export const updateNewsApi = async (data) => {
    try {
      console.log(data);
      const res= await axios.post(`${URL}/newsUpdate`,data);
      return res;
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    }
  };
  export const deleteNewsApi = async (data) => {
    try {
      console.log(data);
      const res= await axios.post(`${URL}/deleteNews`,data);
      return res;
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    }
  };