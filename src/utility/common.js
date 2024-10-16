import { Common_URL } from "../url";
export const  HandleDebounceBeforeEvent=(func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

export const checkImageExists = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `${Common_URL}/images/${url}`;
      img.onload = () => resolve(true); // Image exists
      img.onerror = () => resolve(false); // Image does not exist
    });
  };