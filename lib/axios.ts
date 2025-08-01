// lib/axios.ts
import axios from "axios";

const BASE_URL = "http://localhost:1337";

const Ax = axios.create({
  baseURL: BASE_URL,
});

export default Ax;
export { BASE_URL };
