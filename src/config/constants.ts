

export const URL="http://localhost:1001";

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