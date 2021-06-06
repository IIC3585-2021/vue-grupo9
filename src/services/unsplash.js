import axios from "axios";

const accessKey = "oATOAhYStQlB8L6si3nuwRqscwn6v-bMRtgRZizy7q4";

const apiEndpoint = "https://api.unsplash.com/";
const randomPhotoEndpoint = `${apiEndpoint}photos/random`;
const photoByIdEndpoint = `${apiEndpoint}photos/`;

export const getRandomPhoto = async param => {
  try {
    const res = await axios.get(randomPhotoEndpoint, {
      params: {
        client_id: accessKey,
        count: 1,
        ...param
      }
    });

    if (res.status == 200) return res.data[0];
    else return null;
  } catch (exc) {
    console.error(exc);
    return null;
  }
};

export const getPhotoById = async (param, photoId) => {

    try {
        const res = await axios.get(photoByIdEndpoint + photoId, {
          params: {
            client_id: accessKey,
            count: 1,
            ...param
          }
        })
    
        if (res.status == 200){
            //console.log(res.data)
             return res.data
            }
            else return null
            
      } catch (exc) {
        console.error(exc);
        return null;
      }

}