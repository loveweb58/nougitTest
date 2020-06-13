import React, { useState, useEffect } from 'react';

import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { Row, Col } from 'reactstrap';
import EntryCard from './EntryCard'
import Filter from './Filter'

export const GET_ENTRIES = gql`
  query getEntries($page: Int, $limit: Int, $sort: String, $isTrending: Boolean, $status: Int){
    entries(page: $page, limit: $limit, sort: $sort, isTrending: $isTrending, status: $status) {
        author {
          picture,
          name
        },
        title,
        description,
        numComments,
        thumbnail,
        codeSubmissionTotal,
        pledgeTotal,
        pledgeGoal,
        pledgerCount,
        isTrending,
        status
      }
  }
`;

export default function EntryViewer(props) {

  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1)
  const [trending, setTrending] = useState(false)
  const [status, setStatus] = useState(-1)

  const [getEntries] = useLazyQuery(GET_ENTRIES, {
    onCompleted: (data) => {
      if (data && data.entries) {
        props.setState([...props.state, ...data.entries]);
      }
    }
  });
  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    const list = document.getElementById('list')
    if(props.scrollable) {   
      list.addEventListener('scroll', (e) => {
        const el = e.target;
        if(el.scrollTop + el.clientHeight === el.scrollHeight) {
          setLoadMore(true);
        }
      });  
    } else {  
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= list.clientHeight + list.offsetTop) {
          setLoadMore(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const list = document.getElementById('list');
    if(list.clientHeight <= window.innerHeight && list.clientHeight) {
      setLoadMore(true);
    }
  }, [props.state]);


  const getData = (load) => {
    let vrabl = {page: page, limit: 5, sort: 'date'}
    if (load) {
      if(trending) {
        vrabl.isTrending = trending
      } 
      if(status !== -1) {
        vrabl.status = status
      }
      getEntries({ variables: vrabl })
      setPage(page+1)
    }
  };

  const onFilterChange = (filter) => {

    props.setState([])

    setTimeout(()=> {
      switch (filter) {
        case 'all':
          getEntries({ variables: {page: page, limit: 5, sort: 'date'} })
          setTrending(false)
          setStatus(-1)
          break;
        case 'trending':
            getEntries({ variables: {page: page, limit: 5, sort: 'popularity', isTrending: true} })
            setTrending(true)
            setStatus(-1)
            break;
        case 'open': 
            getEntries({ variables: {page: page, limit: 5, sort: 'date', status: 1} })
            setTrending(false)
            setStatus(1)
          break;
        case 'close': 
            getEntries({ variables: {page: page, limit: 5, sort: 'date', status: 0} })
            setTrending(false)
            setStatus(0)
          break;
        default:
          break;
      }
      setPage(1)
    }, 300)
  }

  return (
    <>
    <Filter onFilterChange={onFilterChange} />
    <ul id='list' >
        {
         props.state && props.state.map((entry, index) => (
          <li key={index}>
              <Row>
                <Col sm="12" md={{ size: 4, offset: 4 }}>
                  <EntryCard data={entry}  />
                </Col>
              </Row>
          </li>
          ))
        }
     </ul>
     </>
  )
};