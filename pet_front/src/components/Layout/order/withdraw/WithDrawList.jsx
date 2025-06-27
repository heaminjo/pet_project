import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageNumber from '../../../util/PageNumber';
import GoodsApi from '../../../../api/GoodsApi';
import OrderApi from '../../../../api/OrderApi';

export default function WithDrawList() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const location = useLocation();
  const prodImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const navigate = useNavigate();

  // 페이징 위함
  const [goodsList, setGoodsList] = useState([]);
  const [quantityMap, setQuantityMap] = useState({}); // Map 용도( goods id : goods quantity )

  const [info, setInfo] = useState([]); // OrderDetailResponseDTO List
  const [showModal, setShowModal] = useState(false); // Y/N
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [reviewIdMap, setReviewIdMap] = useState({}); // { orderDetailId: reviewId }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 페이징 관련 상태변수
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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 재주문 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 장바구니 담기
  const addToCart = async (goods, buyQuantity) => {
    try {
      const response = await GoodsApi.addToCart(goods, buyQuantity);
      // alert("장바구니에 " + goods.goodsName + "이(가) 1개 담겼습니다.");
      // navigate("/user/mypage/cart/list");
      console.log(`장바구니 담기 성공, 상품ID:  => ${response}`);
      setShowModal(true); // 모달 표시
    } catch (err) {
      alert('장바구니 담기에 실패했습니다.');
    }
  };

  // ~~~~~~~~~~~~~~~~~ 내역 리스트를 순회하며 날짜별로 그룹화 ~~~~~~~~~~~~~~~~~~~~
  const groupByDate = (info) => {
    const grouped = {};
    info.forEach((item) => {
      const dateKey = new Date(item.regDate).toISOString().split('T')[0]; // 'YYYY-MM-DD'
      // toISOString() : 시차 방어 (UTC 기준)
      // 2025-06-05T15:57:22.427+09:00 --> '2025-06-05' 추출
      if (!grouped[dateKey]) grouped[dateKey] = []; // 빈배열 방어
      grouped[dateKey].push(item);
    });

    return grouped;
  };
  const groupedInfo = groupByDate(info); // 함수 실행
  const sortedDates = Object.keys(groupedInfo).sort((a, b) => new Date(b) - new Date(a)); // 그룹화한 리스트 결과를 날짜 최신순 정렬

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const getPageList = async () => {
    const pages = {
      page: page,
      size: 5,
      sortBy: 'desc',
      keyword: keyword,
      type: type,
    };

    try {
      const response = await OrderApi.getWithDrawPageList(pages);
      if (Array.isArray(response?.content)) {
        setInfo(response.content);
      } else {
        console.error('비정상 응답:', response);
        setInfo([]);
      }

      let temp = Math.floor(page / 5) * 5;
      setPaging({
        start: temp,
        end: Math.min(temp + 5, response.totalPages),
        isPrev: response.prev,
        isNext: response.next,
        totalElement: response.totalElements,
        totalPages: response.totalPages,
      });
    } catch (err) {
      console.error('getPageList 실패:', err);
    }
  };

  useEffect(() => {
    getPageList();
  }, [page]);

  return (
    <WithDrawListComp>
      <div className='container'>
        <h2>취소 / 교환 / 반품 요청내역</h2>
        <div>
          {sortedDates.map((date) => (
            <div key={date} className='orderlist'>
              <hr />
              {groupedInfo[date].map((item, index) => (
                <div key={item.orderDetailId} className='ordertitle'>
                  <div className='orderstate'>
                    {date} 반품일
                    <button className='btn3'>주문취소</button>
                  </div>
                  <div className='orderlist2'>
                    <div className='orderdesc'>
                      <img src={`${item.imageFile}`} alt={item.goodsName} className='prodimg' onClick={() => navigate('/user/order', { state: { goods: item } })} />
                      <br />
                      <div className='proddesc'>
                        {item.status === '취소완료' ? <b> {item.status}</b> : <b style={{ color: 'red' }}>{item.status}</b>}
                        <br />
                        {item.goodsName} <br />
                        {item.goodsPrice} 원 / {item.goodsQuantity} 개
                      </div>
                      <div className='btn'>
                        <button className='btn1' onClick={() => addToCart(item, 1)}>
                          장바구니 담기
                        </button>
                        <button className='btn2' onClick={() => navigate(`/user/mypage/delivery?orderDetailId=${item.orderDetailId}`)}>
                          배송조회
                        </button>

                        {item.reviewId ? (
                          <button className='btn4' onClick={() => navigate(`/user/mypage/review?reviewId=${item.reviewId}`)}>
                            리뷰수정
                          </button>
                        ) : (
                          <button className='btn4' onClick={() => navigate('/user/mypage/review', { state: { goods: item } })}>
                            리뷰작성
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
            </div>
          ))}
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </WithDrawListComp>
  );
}

const WithDrawListComp = styled.div`
  modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
  .container {
    width: 900px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    color: #444;
  }

  h2 {
    font-size: 1.6rem;
    color: #444;
    margin-bottom: 10px;
    padding: 10px 20px;
    display: inline-block;
  }

  .orderlist {
    margin-bottom: 30px;
  }

  .ordertitle {
    font-weight: bold;
    font-size: 1.1rem;
    background-color: rgb(248, 246, 246);
    padding: 12px 16px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-bottom: none;
  }

  .orderstate {
    width: inherit;
    height: 40px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: start;
    align-items: center;
    font-size: 20px;

    button {
      width: 200px;
      padding: 8px 12px;
      background-color: #ffaaaa;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-left: 20px;
    }

    button:hover {
      background-color: rgb(255, 145, 145);
    }
  }

  .orderlist2 {
    display: flex;
    justify-content: center;
    padding: 0 0 10px 0;
    border-top: none;
    border-radius: 0 0 6px 6px;
  }

  .orderdesc {
    display: flex;
    align-items: center;
    border-radius: 6px 6px 0 0;
    padding: 10px;
    gap: 20px;
    width: 100%;
  }

  .prodimg {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.3s ease; /* 부드러운 애니메이션 */
    box-shadow: 1px 1px 3px rgb(150, 150, 150);
  }

  .prodimg:hover {
    transform: scale(1.05);
  }

  .proddesc {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #444;

    b {
      font-weight: bold;
      font-size: 0.95rem;
      color: #444;
    }
  }

  .btn {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 200px;
    justify-content: center;

    button {
      padding: 8px 12px;
      background-color: #ffaaaa;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background-color: rgb(255, 145, 145);
    }
  }
`;
