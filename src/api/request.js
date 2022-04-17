import axios from 'axios'

const SUCCESS = 0;
const request = axios.create({
  baseUrl: import.meta.env.VITE_APP_BASE_URL,
  timeout: 3e3
})

request.interceptors.request.use(
  config => {
    config.url = config.baseUrl + config.url
    return config
  },
  error => Promise.reject(error)
);

request.interceptors.response.use(
  response => SUCCESS === response.data.code ? response.data.data : Promise.reject(response.data.code),
  error => Promise.reject(error)
);

export default request
