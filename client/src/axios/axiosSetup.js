import axios from "axios";

const custom_axios = axios.create({
  baseURL:
    (process.env.REACT_APP_BASE_URL
      ? process.env.REACT_APP_BASE_URL
      : "https://travel-stories-1.herokuapp.com") + "/api",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export default custom_axios;
