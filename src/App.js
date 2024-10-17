import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageSearch from "./components/imageSearch";
import ImageGrid from "./components/imageParent";
import "./App.css";
import "../src/components/style.css";
import { retrieveImageContent } from "./redux/actions/imageContentAction";

function App() {
  const [searchContent, setSearchContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  let contentDataFromStore = useSelector(
    (state) => state.imageContent.contentList
  );

  const dispatch = useDispatch();

  const fetchDataRedux = useCallback(() => {
    dispatch(retrieveImageContent(currentPage))
      .then((response) => {
        setLoadMore(true);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch((err) => {
        setLoadMore(false);
      });
  }, [currentPage, dispatch]);


  useEffect(() => {
    fetchDataRedux();
  }, []);

  const filterContent = useMemo(() => {
    return contentDataFromStore && contentDataFromStore.length
      ? contentDataFromStore.filter((item) =>
          item.name.toLowerCase().includes(searchContent.toLowerCase())
        )
      : [];
  }, [contentDataFromStore, searchContent]);

  const renderContent = () => {
    if (filterContent.length === 0) {
      if (searchContent) {
        return (
          <p className="infocontent">No results found for "{searchContent}"</p>
        );
      } else if (contentDataFromStore.length === 0) {
        return <p className="infocontent">Loading...</p>;
      }
    }

    return (
      <InfiniteScroll
        dataLength={filterContent.length}
        next={fetchDataRedux}
        hasMore={loadMore}
        endMessage={<p className="text-center">No more items to load.</p>}
      >
        <ImageGrid data={filterContent} />
      </InfiniteScroll>
    );
  };

  return (
    <>
      <div>
        <ImageSearch setSearchContent={setSearchContent} />
        <div className="gridparentwrapper">{renderContent()}</div>
      </div>
    </>
  );
}

export default React.memo(App);
