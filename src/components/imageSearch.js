import React, {useState, useEffect, useMemo, useCallback, useRef} from "react";
import { useSelector } from "react-redux";
import { HandleDebounceBeforeEvent } from "../utility/common";
import { Common_URL } from "../url";

const ImageSearch = ({ setSearchContent }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  let contentDataFromStore = useSelector(
    (state) => state.imageContent.contentTitle
  );
  const inputRef = useRef(null);

  useEffect(() => {
    if (openSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openSearch]);


  const debouncedSetSearchContent = useMemo(
    () => HandleDebounceBeforeEvent(setSearchContent),
    [setSearchContent]
  );

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchContent(value);
  }, [debouncedSetSearchContent]);

  const clearSearch = useCallback(() => {
    setInputValue('');
    setSearchContent('');
  }, [setInputValue, setSearchContent]);

  const handleOpenSearch = (status)=>{
    clearSearch();
    if(status === 'toggle'){
      setOpenSearch(!openSearch)
    }else{
      setOpenSearch(false)
    }
  }
  return (
    <>
      <div className="container">
        <div className="navheaderwrapper">
          <div className="navheader">
            <div className="backandtextwrapper">
              <img
                src={`${Common_URL}/images/Back.png`}
                className="backbtn img-fluid"
                onClick={()=>handleOpenSearch('close')}
                alt="backicon"
              />
              <h4 className="my-1">{contentDataFromStore || "Untitled"}</h4>
            </div>
            <div className="search-box">
              <button className="btn-search" onClick={()=> handleOpenSearch('toggle')}>
                <img
                  src={`${Common_URL}/images/search.png`}
                  className="searchicon img-fluid"
                  alt="searchicon"
                />
              </button>
              <form className={openSearch ? "open-input-search" : "close-input-search"}>
                <input
                  ref={inputRef}
                  type="text"
                  className="input-search"
                  placeholder="Type to Search..."
                  value={inputValue}
                  onChange={handleInputChange}
                />
                 {inputValue && (
                  <span className="btn-clear" onClick={clearSearch}>
                    ×
                  </span>
                 )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ImageSearch);
