import axios from "axios";
const BASE_URL = "http://localhost:8000/api";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials:true,
});

 const protectedApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  // headers: { "Content-Type": "application/json" },
});

protectedApi.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem('access_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export {api,protectedApi};
