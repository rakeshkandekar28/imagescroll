import React, { useState, useMemo, useEffect } from "react";
import { Tooltip } from "antd";
import { checkImageExists } from "../utility/common";
import { Common_URL } from "../url";

const ImageItem = React.memo(({ item }) => {
  const [isImageValid, setIsImageValid] = useState(false);
  const placeholderImage = useMemo(
    () => `${Common_URL}/images/placeholder_for_missing_posters.png`,
    []
  ); // if api missing image
  const title = useMemo(() => item.name || "Untitled", [item.name]);

  useEffect(() => {
    validateImage();
  }, [item]);

  const validateImage = async () => {
    const exists = await checkImageExists(item["poster-image"]);

    setIsImageValid(exists);
  };

  const imageSrc = useMemo(() => {
    return isImageValid
      ? `${Common_URL}/images/${item["poster-image"]}`
      : placeholderImage;
  }, [isImageValid, item["poster-image"], placeholderImage]);

  return (
    <>
      <div className="image-card">
        <img loading="lazy" src={imageSrc} alt={title} className="img-fluid" />
      </div>
      <Tooltip title={title} trigger="hover">
        <h5 className="contenttitle">{title}</h5>
      </Tooltip>
    </>
  );
});

export default React.memo(ImageItem);
