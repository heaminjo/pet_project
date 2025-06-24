import GoodsListComp from './GoodsListStyle.js';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import GoodsApi from '../../../api/GoodsApi';
import PageNumber from '../../util/PageNumber.jsx';

export default function GoodsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const imgUrl = 'http://localhost:8080/resources/webapp/userImages/';
  const EMPTY_HEART = '🤍';
  const FULL_HEART = '💖';

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods
  // const [inputKeyword, setInputKeyword] = useState(searchKeyword); // searchKeyword의 초기값을 inputKeyword로 설정

  // 카테고리
  const [categories, setCategories] = useState([]);

  // 검색 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 쿼리스트링에서 현재 상태값 추출
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page')) || 0;
  const keyword = queryParams.get('searchKeyword') || '';
  const type = queryParams.get('searchType') || 'all';
  const [inputType, setInputType] = useState(type);

  // 입력 키워드
  const [inputKeyword, setInputKeyword] = useState(keyword);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'desc';

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // 검 색 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const params = new URLSearchParams(location.search);

  // input 상태 관리 (검색어 입력창과 싱크 맞추기)
  // 검색창에 입력한 값 inputKeyword에 저장

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 함 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //검색 기능
  //검색 버튼 클릭
  const searchClick = (e) => {
    if (e) e.preventDefault();
    handleChangeQuery('searchKeyword', inputKeyword);
  };
  // 엔터 시
  const handleSearch = (e) => {
    e.preventDefault();
    handleChangeQuery('searchKeyword', inputKeyword);
  };

  // 쿼리변경
  const handleChangeQuery = (key, value) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(key, value);
    if (key !== 'page') updatedParams.set('page', 0);
    setSearchParams(updatedParams);
  };

  // 상품1개 클릭시
  const clickProd = (item) => {
    console.log(`clickProd 선택된 상품: ${item.goodsId}, ${item.goodsName}, ${item.goodsState}, ${item.description}, ${item.price}`);
    navigate('/goods/order', { state: { goods: item } });
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  // 페이징
  // 상품 데이터 조회 함수
  const getPageList = async () => {
    // 최신으로 다시 읽기
    const queryParams = new URLSearchParams(location.search);
    const page = parseInt(queryParams.get('page')) || 0;
    const keyword = queryParams.get('searchKeyword') || '';
    const type = queryParams.get('searchType') || 'all';
    const sort = searchParams.get('sort') || 'desc';

    const pages = {
      page,
      size: 8,
      sortBy: sort,
      keyword,
      type,
    };

    try {
      const result = await GoodsApi.getGoodsPageList(pages);
      setGoods(result.content);

      let temp = Math.floor(page / 5) * 5;
      setPaging({
        start: temp,
        end: Math.min(temp + 5, result.totalPages),
        isPrev: result.prev,
        isNext: result.next,
        totalElement: result.totalElements,
        totalPages: result.totalPages,
      });
    } catch (err) {
      console.error('getPageList 실패: ', err);
    }
  };

  // 카테고리 로딩
  const loadCategories = async () => {
    try {
      const response = await GoodsApi.getCategoryList();
      setCategories(response);
    } catch (error) {
      console.error('카테고리 불러오기 실패:', error);
    }
  };

  // 페이징, 검색 조건
  useEffect(() => {
    getPageList();
  }, [location.search]);

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <GoodsListComp>
      <div className='container'>
        <div>
          <form
            className='search-bar'
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '30px 0 0 0',
            }}
            onSubmit={(e) => {
              searchClick(e);
            }}>
            <div className='custom-select'>
              <select value={sort} onChange={(e) => handleChangeQuery('sort', e.target.value)}>
                <option value='desc'>최신순</option>
                <option value='asc'>오래된 순</option>
              </select>
              <select
                value={inputType}
                onChange={(e) => {
                  setInputType(e.target.value);
                  handleChangeQuery('searchType', e.target.value);
                }}>
                <option value='all'>전체</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <input
              type='text'
              defaultValue={inputKeyword} //
              onChange={(e) => setInputKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)} //
              onBlur={(e) => handleChangeQuery('searchKeyword', e.target.value)}
            />

            <button className='search_btn' onClick={(e) => searchClick(e)}>
              <span role='img' aria-label='search'>
                🔍
              </span>
            </button>
          </form>
        </div>
        <br />
        <hr />
        <div className='body'>
          <h2>BEST SELLER</h2>
          <section className='list'>
            {Array.isArray(goods) &&
              goods?.map((item, index) => (
                <div className='goodslist' key={index} onClick={() => clickProd(item)}>
                  <img src={`${imgUrl}${item.imageFile}`} alt={item.goodsName} className='prodimg' />
                  <div>
                    <b>{item.goodsName} </b>
                  </div>
                  <div>
                    {item.description} {', '}
                    {item.quantity} 개
                  </div>
                  <div>{item.price} 원</div>
                  <div>
                    <span>{renderStars(item.rating)}</span>
                    <span style={{ color: 'red', fontSize: '12px' }}> {'( ' + item.reviewNum + ' )'} </span>
                  </div>
                </div>
              ))}
          </section>
          <PageNumber page={page} setPage={(p) => handleChangeQuery('page', p)} paging={paging} />
          <br />
          <hr />
          <h2>자주 산 상품</h2>

          <section className='list'>
            {Array.isArray(goods) &&
              goods.map((item, index) => (
                <div className='goodslist' key={index} onClick={() => clickProd(item)}>
                  <img src={`${imgUrl}${item.imageFile}`} alt={item.goodsName} className='prodimg' />
                  <div>
                    <b>{item.goodsName} </b>
                  </div>
                  <div>
                    {item.description} {', '}
                    {item.quantity} 개
                  </div>
                  <div>{item.price} 원</div>
                  <div>
                    <span>{renderStars(item.rating)}</span>
                    <span style={{ color: 'red', fontSize: '12px' }}> {'( ' + item.reviewNum + ' )'} </span>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </GoodsListComp>
  );
}
