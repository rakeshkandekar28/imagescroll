import {
  RETRIEVE_IMAGECONTENT,
  FAILED_IMAGECONTENT,
} from "./types";
import axios from 'axios';
import { Common_URL } from "../../url";


export const retrieveImageContent = (page) => {

  return async (dispatch) => {
    try {
      const response = await axios.get(`${Common_URL}/data/page${page}.json`);
      dispatch({ type: RETRIEVE_IMAGECONTENT, payload: response.data });
      console.log("retrieveImageContent response.data",response.data)
      return response.data; // Return data
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch({ type: FAILED_IMAGECONTENT, error }); // Handle errors if needed
      throw error; 
    }
  };
};


