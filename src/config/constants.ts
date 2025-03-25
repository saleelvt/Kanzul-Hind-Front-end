

export const URL="http://localhost:1001/api/v1";

 export const createAxiosConfig = (isFileUpload = false) => ({
    headers: {
        "Content-Type": isFileUpload ? "multipart/form-data" : "application/json",
    },
    withCredentials: true,
});

export const config ={
    headers :{
        "Content-Type":"multipart/form-data",
    },
    withCredentials:true
} 



export const configWithToken = () => {
    let token = localStorage.getItem("accessToken");
    token = token ? token.replace(/^"|"$/g, "").trim() : null;
    console.log("MY TOKENx IS:", token);
  
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: false
    };
  };
    

export const configWithTokenMultiPart = () => {

    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
  };