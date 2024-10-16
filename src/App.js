import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ImageSearch from './components/imageSearch';
import ImageGrid from './components/imageParent';
// import { Common_URL } from './url';
import "./App.css";
import '../src/components/style.css'
import { retrieveImageContent } from './redux/actions/imageContentAction';


function App() {

  // const [contentData, setContentData] = useState([]); // added at start for wthout redux
  const [searchContent, setSearchContent] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  let contentDataFromStore = useSelector(state => state.imageContent.contentList);

  const dispatch = useDispatch();

  const fetchDataRedux = useCallback(() => {
    dispatch(retrieveImageContent(currentPage))
      .then(response => {
        setLoadMore(true);
        setCurrentPage((prevPage) => prevPage + 1);
      })
      .catch(err => {
        setLoadMore(false);
      });
  }, [currentPage, dispatch]);

  // const fetchData = async (page) => {
  //   try {
  //     const response = await axios.get(`${Common_URL}/data/page${page}.json`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     throw error; 
  //   }
  // };

  // const loadMoreData = async () => {
  //   if (loadMore) {
  //     try{
  //       const response = await fetchData(currentPage);
  //       console.log("loadMoreData response", response)
  //       const newData = response.page["content-items"].content;
  //       // console.log("newData",newData.page["content-items"].content)
  //       setContentData((prevData) => [...prevData, ...newData]);
  //       setCurrentPage((prevPage) => prevPage + 1);
  //       if (newData.length === 0) {
  //         setLoadMore(false); // No more data
  //       }
  //     }
  //     catch(err){
  //       console.log("err",err)
  //       setLoadMore(false);
  //     }
      
  //   }
  // }; // added at start for wthout redux

  useEffect(() => {
    // loadMoreData(); // added at start for wthout redux
    fetchDataRedux();
  }, []);



  const filterContent = useMemo(() => {
    return contentDataFromStore && contentDataFromStore.length
      ? contentDataFromStore.filter(item =>
          item.name.toLowerCase().includes(searchContent.toLowerCase())
        )
      : [];
  }, [contentDataFromStore, searchContent]);

  const renderContent = () => {
    if (filterContent.length === 0) {
      if (searchContent) {
        return <p className="text-center">No results found for "{searchContent}"</p>;
      } else if (contentDataFromStore.length === 0) {
        return <p className="text-center">Loading...</p>;
      }
    }

    return (
      <InfiniteScroll
        dataLength={filterContent.length}
        next={fetchDataRedux}
        hasMore={loadMore}
        endMessage={<p className='text-center'>No more items to load.</p>}
      >
        <ImageGrid data={filterContent} />
      </InfiniteScroll>
    );
  };



  return (
    <>
    <div>
      <ImageSearch setSearchContent={setSearchContent}/>
      <div className='gridparentwrapper'>
        {renderContent()}
      </div>
    </div>
    </>
  );
}

export default React.memo(App);
