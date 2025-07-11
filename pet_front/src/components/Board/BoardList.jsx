import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BoardListStyle from './BoardListStyle';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PageNumber from '../util/PageNumber';
import instance from '../../api/axiosInstance';
import { FaSearch } from 'react-icons/fa';

export default function BoardList() {
  const { category } = useParams(); // URL 파라미터에서 카테고리 추출
  const [listData, setListData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchType = params.get('searchType') || 'title';
  const searchKeyword = params.get('searchKeyword') || '';
  const page = parseInt(params.get('page')) || 0;
  //const [searchType, setSearchType] = useState("title");
  //const [searchKeyword, setSearchKeyword] = useState("");
  const [inputKeyword, setInputKeyword] = useState(searchKeyword); // searchKeyword의 초기값을 inputKeyword로 설정

  useEffect(() => {
    setInputKeyword(searchKeyword);
  }, [searchKeyword]);

  // pageNumber 상태 변수 추가
  const [paging, setPaging] = useState({
    page: 0,
    size: 3,
    totalElements: 0,
    totalPages: 1,
    isPrev: false,
    isNext: true,
    start: 0,
    end: 1,
  });
  //const [page, setPage] = useState(0);

  // 카테고리별 API 엔드포인트 매핑
  const categoryApiMap = {
    notice: '/board/boardList/notice',
    community: '/board/boardList/community',
    faq: '/board/boardList/faq',
    free: '/board/boardList/free',
  };

  // 카테고리별 게시판 이름 매핑
  const categoryNameMap = {
    notice: '공지사항',
    community: '커뮤니티',
    faq: 'Q&A',
    free: '자유게시판',
  };

  useEffect(() => {
    // 카테고리가 없으면 기본 board로 설정
    const apiUrl = categoryApiMap[category] || '/board/boardList/free';
    const params = { page, size: paging.size };
    if (searchKeyword.trim() !== '') {
      params.searchType = searchType;
      params.searchKeyword = searchKeyword;
    }
    instance
      .get(apiUrl, { params })
      .then((response) => {
        setListData(response.data.content || []);
        let temp = Math.floor(page / 3) * 3;
        setPaging((prev) => ({
          ...prev,
          page: response.data.page,
          size: response.data.size,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages,
          isPrev: response.data.prev, // javaBean 규약으로 인해 boolean type의 변수는 isPrev가 아닌 prev로 되어있음
          isNext: response.data.next,
          start: temp,
          end: Math.min(temp + 3, response.data.totalPages),
        }));
      })
      .catch((error) => setError(error));
    // eslint-disable-next-line
  }, [category, location.search]);

  if (error) {
    // 서버 에러 코드에 따라 메시지 분기
    if (error.response && error.response.status === 502) {
      return <div>{error.response.data}</div>;
    }
    return <div>게시판을 불러오지 못했습니다. =&gt; {error.message}</div>;
  }

  //검색 기능

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    params.set('searchType', searchType);
    params.set('searchKeyword', inputKeyword);
    params.set('page', 0);
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <BoardListStyle>
      <div className='boardListContainer'>
        <div className='boardListMenuContainer'>
          <ul className='boardListMenu'>
            {/* 클릭하면 해당 카테고리로 이동 */}
            <li onClick={() => navigate('/boardList/notice')}>공지사항</li>
            <li onClick={() => navigate('/boardList/community')}>커뮤니티</li>
            <li onClick={() => navigate('/boardList/faq')}>Q&A</li>
            <li onClick={() => navigate('/boardList/free')}>게시판</li>
          </ul>
        </div>
        <div className='boardTitle'>
          {/* 해당 게시판의 종류에 따라 게시판 이름 표시 */}
          {categoryNameMap[category] || '자유게시판'}
        </div>
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {!listData || listData.length === 0 ? (
              <tr>
                <td colSpan={5} className='center' style={{ textAlign: 'center', padding: '20px' }}>
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              listData.map((b, index) => (
                <tr key={index}>
                  <td className='center'>{paging.totalElements - paging.page * paging.size - index}</td>
                  <td className='center' onClick={() => navigate(`/boardDetail/${category}/${b.board_id}${location.search}`)} style={{ cursor: 'pointer', width: '50%' }}>
                    {b.title}
                  </td>
                  <td className='center' style={{ width: '15%' }}>
                    {b.name}
                  </td>
                  <td className='center' style={{ width: '10%' }}>
                    {b.views}
                  </td>
                  <td className='center' style={{ width: '15%' }}>
                    {b.reg_date}
                  </td>
                </tr>
              ))
            )}
            <tr>
              <td colSpan={5} align='right'>
                <button
                  type='button'
                  onClick={() => {
                    if (sessionStorage.getItem('accessToken') != null) {
                      navigate(`/boardInsertForm?category=${category || 'board'}`);
                    } else {
                      alert('로그인 해주세요');
                      navigate('/login?redirectTo=/boardInsertForm');
                    }
                  }}>
                  글쓰기
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='pageNumber'>
          <PageNumber
            page={page}
            setPage={(newPage) => {
              const params = new URLSearchParams(location.search);
              params.set('page', newPage);
              navigate({
                pathname: location.pathname,
                search: params.toString(),
              });
            }}
            paging={paging}
          />
        </div>
        <form
          className='search-bar'
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '30px 0 0 0',
          }}
          onSubmit={(e) => {
            e.preventDefault(); // 폼 제출 시 새로고침 방지
            handleSearch();
          }}>
          <div className='custom-select'>
            <select
              value={searchType}
              onChange={(e) => {
                const params = new URLSearchParams(location.search);
                params.set('searchType', e.target.value);
                params.set('page', 0);
                navigate({
                  pathname: location.pathname,
                  search: params.toString(),
                });
              }}>
              <option value='title'>제목</option>
              <option value='content'>내용</option>
              <option value='writer'>작성자</option>
            </select>
          </div>
          <input
            type='text'
            value={inputKeyword}
            onChange={(e) => {
              setInputKeyword(e.target.value);
            }}
            placeholder='검색어를 입력하세요'
          />
          <button type='submit'>
            <span role='img' aria-label='search'>
              <FaSearch color='rgb(70, 66, 65)' size={30} style={{ width: '24px' }} />
            </span>
          </button>
        </form>
      </div>
    </BoardListStyle>
  );
}
