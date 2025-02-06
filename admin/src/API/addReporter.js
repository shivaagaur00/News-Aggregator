import axios from "axios";
const URL = "http://localhost:8000";
export const addReporterAPI = async (data) => {
  try {
    console.log(data);
    let res=await axios.post(`${URL}/addReporter`,data);
    return res;
  } catch (error) {
    return error;
  }
};