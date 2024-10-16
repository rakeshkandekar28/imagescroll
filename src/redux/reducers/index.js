import { combineReducers } from "redux";
import imageContent from "./imageContentReducer";



const rootReducer = combineReducers({
  imageContent, 
});

export default rootReducer;
