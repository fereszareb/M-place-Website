import axios from "axios";

export default axios.create({
  baseURL: "http://172.16.134.105:3000/",
});
