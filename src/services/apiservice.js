const axios = require('axios');
/**
 * Common Get method
 * @param {*} url : string
 */
export async function getApi (url) {

        const tokenStr=localStorage.getItem('accessToken');
        return axios.get(`${process.env["REACT_APP_BACKEND_API"]}${url}`, { headers: {"Authorization" : `Bearer ${tokenStr}`} })
        .then(response=>{
            let data = response.data;
            return data;
        }).catch(error=>{
            console.log(error);
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
        let response = await fetch(`${process.env["REACT_APP_BACKEND_API"]}${url}`,
                {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                    headers: {'Authorization':`Bearer ${localStorage.getItem('accessToken')}`}
                  },
                  body:JSON.stringify(argBody)
            });
        let data = await response.json();
        return data;
    } catch(error){
        throw new Error(error);
    }
}


/**
 * Common Update method to update entity 
 * @param {} url : string
 * @param {*} argId : string
 * @param {*} argBody : object
 */
export async function updateApi (url,argId,argBody) {
    try{
        let response = await fetch(`${process.env["REACT_APP_BACKEND_API"]}/${url}?id=${argId}`,{method:"PUT",body:JSON.stringify(argBody)});
        let data = await response.json();
        return data;
    } catch(error){
        throw new Error(error);
    }
}
  