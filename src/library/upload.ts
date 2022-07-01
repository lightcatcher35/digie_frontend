
import Axios from "axios";

export async function uploadImage(files:FileList|null){

  console.log("uploadImage",files)
  if(files?.length){
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ot20sive");

    const response=await Axios.post(
      "https://api.cloudinary.com/v1_1/dcy5f3tyv/image/upload",
      formData
    );

    return {
        status:response?.status,
        statusText:response?.statusText,
        data:response?.data
    }
  }else{
    return {
      status:400,
      statusText:"ERROR",
      data:{
        url:""
      }
  }
  }
    
  };