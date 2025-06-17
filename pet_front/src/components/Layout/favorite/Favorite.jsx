import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';
import PageNumber from '../../util/PageNumber';
import FavoriteComp from './FavoriteStyle';

export default function Favorite() {
  const navigate = useNavigate();
  const location = useLocation();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const seller = process.env.PUBLIC_URL + '/images/avatar.png';
  const imgUrl = 'http://localhost:8080/resources/webapp/userImages/';

  // 페이징 관련 상태변수
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0); // 1 페이지, 2 페이지, ...
  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // 상품1개 클릭시
  const clickProd = (item) => {
    alert(`clickProd 선택된 상품: ${item.goodsId}, ${item.goodsName}, ${item.goodsState}, ${item.description}, ${item.price}`);
    navigate('/goods/order', { state: { goods: item } });
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const getPageList = async () => {
    const pages = {
      page: page,
      size: 5,
      sortBy: sort,
      keyword: keyword,
      type: type,
    };
    try {
      const result = await GoodsApi.getFavoritePageList(pages);
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
    <FavoriteComp>
      <div className='container'>
        <div className='top'>
          <h2>찜 목록 리스트</h2>
        </div>
        <div className='body'>
          {goods.length === 0 ? (
            <p>찜한 상품이 없습니다.</p>
          ) : (
            goods.map((item) => (
              <div key={item.goodsId} className='prod' onClick={() => clickProd(item)}>
                <div className='prod-left'>
                  <img src={imgUrl + item.imageFile} alt={item.goodsName} width={150} />
                </div>
                <div className='prod-right'>
                  <h4>{item.goodsName}</h4>
                  <p>{item.description}</p>
                  <p>가격: {item.price.toLocaleString()}원</p>
                  <p>
                    별점: {renderStars(item.rating)} ({item.rating})
                  </p>
                  <p>리뷰 수: {item.reviewNum}</p>
                  <p>등록일: {item.regDate}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </FavoriteComp>
  );
}
