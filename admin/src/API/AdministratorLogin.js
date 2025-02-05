import axios from "axios";
const URL = "http://localhost:8000";
export const loginAdmin = async (data) => {
  try {
    console.log(data);
    let res = await axios.post(`${URL}/loginAdmin`, data);
    return res;
  } catch (error) {
    return error;
  }
};
export const adminPostAdd = async (data) => {
  try {
    let res = await axios.post(`${URL}/adminPostAdd`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const adminVidPostAdd = async (data) => {
  try {
    console.log(data);
    let res = await axios.post(`${URL}/adminVidPostAdd`, data);
    console.log(data);
    return res;
  } catch (error) {
    return error;
  }
};

export const approveNews = async (data) => {
  try {
    console.log(data);
    let res = await axios.post(`${URL}/approveNews`, data);
    console.log(data);
    return res;
  } catch (error) {
    return error;
  }
};

export const approveNewsVid = async (data) => {
  try {
    console.log(data);
    let res = await axios.post(`${URL}/approveNewsVid`, data);
    console.log(data);
    return res;
  } catch (error) {
    return error;
  }
};
