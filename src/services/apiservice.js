const axios = require('axios');
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const tokenStr=localStorage.getItem('accessToken');
    config.headers = { 
      'Authorization': `Bearer ${tokenStr}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

// Response interceptor for API calls
// Checks for the error response and if the satus is 401
// then Fetch the token and retry the original request again
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();            
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

/**
 * Method to refetch token on token expiry
 */
export async function refreshAccessToken(){
    const email= localStorage.getItem('emailId');
    const pass= localStorage.getItem('pass');
    const url=`ValidateUserLogin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}`;
    return axios.get(`${process.env["REACT_APP_BACKEND_API"]}${url}`)
    .then(response=>{
        let data = response.data;
        console.log(data);
        localStorage.setItem('accessToken',data.token);
        localStorage.setItem('userId',data.userId);
        localStorage.setItem('role',data.roleType);
        localStorage.setItem('userCode',data.userCode);
        return data;
    }).catch(error=>{
        throw new Error(error);            
    })
}

/**
 * Common Get method
 * @param {*} url : string
 */
export async function getApi (url) {
        return axiosApiInstance.get(`${process.env["REACT_APP_BACKEND_API"]}${url}`)
        .then(response=>{
            let data = response.data;
            return data;
        }).catch(error=>{
            throw new Error(error);            
        })
}




/**
 * Common API to Create an Entity / common post API
 * @param {*} url : string
 * @param {*} argBody : Object
 */
export async function postApi (url,argBody) {
    try{
        let response = await axiosApiInstance.post(`${process.env["REACT_APP_BACKEND_API"]}${url}`,JSON.stringify(argBody));
        let data = await response.json();
        return data;
    } catch(error){
        throw new Error(error);
    }
}

// Method to login user
export async function login(url){
  return axios.get(`${process.env["REACT_APP_BACKEND_API"]}${url}`,{headers:{
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  }})
    .then(response=>{
        let data = response.data;
        console.log(data);
        localStorage.setItem('accessToken',data.token);
        localStorage.setItem('userId',data.userId);
        localStorage.setItem('role',data.roleType);
        localStorage.setItem('userCode',data.userCode);
        return data;
    }).catch(error=>{
        throw new Error(error);            
    })
}
  