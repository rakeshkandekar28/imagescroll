import React from "react";
import ImageItem from "./imageItem";

const ImageGrid = ({ data }) => {
  return (
    <>
      <div className="container p-4 pt-0">
        <div className="row g-3">
          {data && data.length > 0
            ? data.map((item, index) => (
                <div className="col-4 col-md-4 mb-4 p-2" key={`parent${index}`}>
                  <ImageItem item={item} />
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export default React.memo(ImageGrid);
