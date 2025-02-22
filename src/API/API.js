import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  // baseURL: "http://10.75.46.19:8080/api",
  withCredentials: true,
});

export default API;
