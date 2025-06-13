import GoodsListComp from './GoodsListStyle.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoodsApi from '../../../api/GoodsApi';
import PageNumber from '../../util/PageNumber.jsx';

export default function GoodsList() {
  const navigate = useNavigate();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const imgUrl = 'http://localhost:8080/resources/webapp/userImages/';
  const EMPTY_HEART = '🤍';
  const FULL_HEART = '💖';

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods

  // 페이징 관련 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0); // 1 페이지, 2 페이지, ...

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // 검색 관련 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // const params = new URLSearchParams(location.search);
  // const typeParam = params.get('type') || 'all';
  // const keywordParam = params.get('keyword') || '';
  // const sortParam = params.get('sort') || 'desc';
  // const pageParam = parseInt(params.get('page')) || 0;

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 함 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 전체 상품 리스트 조회
  const goodsList = async () => {
    GoodsApi.showGoods()
      .then((response) => {
        setGoods(response);
      })
      .catch((err) => {});
  };

  // 상품1개 클릭시
  const clickProd = (item) => {
    alert(`clickProd 선택된 상품: ${item.goodsId}, ${item.goodsName}, ${item.goodsState}, ${item.description}, ${item.price}`);
    navigate('/goods/order', { state: { goods: item } });
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  // // 검색기능
  // useEffect(() => {
  //   setType(typeParam);
  //   setKeyword(keywordParam);
  //   setSort(sortParam);
  //   setPage(pageParam);
  // }, [typeParam, keywordParam, sortParam, pageParam]);

  // 페이징징
  const getPageList = async () => {
    const pages = {
      page: page,
      size: 5,
      sortBy: sort,
      keyword: keyword,
      type: type,
    };
    try {
      const result = await GoodsApi.getGoodsPageList(pages);
      // 1. 상품 목록
      setGoods(result.content);

      // 2. 페이지번호 정보
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

  useEffect(() => {
    getPageList();
  }, [page]);

  return (
    <GoodsListComp>
      <div className='container'>
        <h2>상품 리스트 출력 페이지</h2>
        <div></div>
        <div className='body'>
          <h2>BEST SELLER</h2>
          <section className='list'>
            {goods.map((item, index) => (
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
                  <span style={{ color: 'red', fontSize: '12px' }}> {'( ' + item.review_num + ' )'} </span>
                </div>
              </div>
            ))}
          </section>
          <hr />
          <h2>자주 산 상품</h2>
          <section className='list1'>
            <img src={goodsImg} alt='' className='prodimg' />
            <div>상품명</div>
          </section>
          <hr />
          <h2>판매특가</h2>
          <section className='list2'></section>
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </GoodsListComp>
  );
}
