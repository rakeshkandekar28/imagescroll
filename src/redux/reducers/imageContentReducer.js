import {
  RETRIEVE_IMAGECONTENT,
  FAILED_IMAGECONTENT,
} from "../actions/types";

const initialState = {
  contentTitle: '',
  contentList: [],
  lastLoad: false,
};

const imageContentReducer = (imageContent = initialState, action) => {

  const { type, payload } = action;
  switch (type) {
    case RETRIEVE_IMAGECONTENT:
      return {
        ...imageContent, 
        // ...payload.page["content-items"].content,
        contentTitle: payload.page.title,
        contentList: [...imageContent.contentList, ...payload.page["content-items"].content]
      };

    case FAILED_IMAGECONTENT:
      return {
        ...imageContent, 
        lastLoad: true
      };


    default:
      return imageContent;
  }
};

export default imageContentReducer;