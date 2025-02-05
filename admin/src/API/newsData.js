import axios from "axios";
const URL = "http://localhost:8000"; 
export const getNewsData = async (data) => {
  try {
    let res = await axios.post(`${URL}/getNewsData`, data);
    return res;
  } catch (error) {
    return error;
  }
};
