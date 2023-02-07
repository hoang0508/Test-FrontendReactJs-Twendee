import axios from "axios";
import NProgress from "nprogress";
const instance = axios.create({
  baseURL: "https://randomuser.me/api/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();

    return response && response?.data ? response?.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error?.message ? error?.message : Promise.reject(error);
  }
);

export default instance;
