import React from "react";
import { useSelector } from "react-redux";
import { HandleDebounceBeforeEvent } from "../utility/common";
import { Common_URL } from "../url";

const ImageSearch = ({ setSearchContent }) => {
  let contentDataFromStore = useSelector(
    (state) => state.imageContent.contentTitle
  );
  return (
    <>
      <div className="container">
        <div className="navheaderwrapper">
          <div className="navheader">
            <div className="backandtextwrapper">
              <img
                src={`${Common_URL}/images/Back.png`}
                className="backbtn img-fluid"
              />
              <h4 className="my-1">{contentDataFromStore || "Untitled"}</h4>
            </div>
            <div className="search-box">
              <button className="btn-search">
                <img
                  src={`${Common_URL}/images/search.png`}
                  className="searchicon img-fluid"
                />
              </button>
              <input
                type="text"
                className="input-search"
                placeholder="Type to Search..."
                onChange={HandleDebounceBeforeEvent((e) =>
                  setSearchContent(e.target.value)
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ImageSearch);
