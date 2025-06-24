import OrderListComp from './OrderListStyle';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageNumber from '../../util/PageNumber';
import Modal from '../../../modal/Modal';

export default function OrderDetail() {
  const location = useLocation();
  const prodImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const imgUrl = 'http://localhost:8080/resources/webapp/userImages/';
  const navigate = useNavigate();
  // 페이징 위함
  const [goodsList, setGoodsList] = useState([]);
  const [quantityMap, setQuantityMap] = useState({}); // Map 용도( goods id : goods quantity )

  const [info, setInfo] = useState([]); // OrderDetailResponseDTO List

  const [showModal, setShowModal] = useState(false); // Y/N

  const [buyQuantity, setBuyQuantity] = useState(1);

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

  // 모달 핸들러 함수
  const goToCart = () => {
    setShowModal(false);
    navigate('/user/mypage/cart/list');
  };

  // 장바구니 담기
  const addToCart = async (goods, buyQuantity) => {
    try {
      const response = await GoodsApi.addToCart(goods, buyQuantity);
      console.log(`장바구니 담기 성공, 상품ID:  => ${response}`);
      setShowModal(true); // 모달 표시
    } catch (err) {
      alert('장바구니 담기에 실패했습니다.');
    }
  };

  // 주문내역 리스트를 순회하며 날짜별로 그룹화 ~~~~~~~~~~~~~~~~~~~~
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

  // 함수 실행
  const groupedInfo = groupByDate(info);

  // 그룹화한 리스트 결과를 날짜 최신순 정렬
  const sortedDates = Object.keys(groupedInfo).sort((a, b) => new Date(b) - new Date(a));

  // 주문취소

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
      const response = await OrderApi.getOrderDetailPageList(pages); // 이건 Axios full response

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
    <OrderListComp>
      <div className='container'>
        <h2>주문내역</h2>
        <div>
          {showModal && (
            <Modal
              content={
                <>
                  상품이 장바구니에 정상적으로 담겼습니다.
                  <br />
                  장바구니로 이동하시겠습니까?
                </>
              }
              clickEvt={goToCart}
              setModal={setShowModal}
            />
          )}
          {sortedDates.map((date) => (
            <div key={date} className='orderlist'>
              {groupedInfo[date].map((item, index) => (
                <div key={item.orderDetailId} className='ordertitle'>
                  {date} 주문
                  <div className='orderlist2'>
                    <div className='orderdesc'>
                      <img src={`${imgUrl}${item.imageFile}`} alt={item.goodsName} className='prodimg' onClick={() => navigate('/user/order', { state: { goods: item } })} />
                      <br />
                      <div className='proddesc'>
                        <b>결제완료</b> <br />
                        {item.goodsName} <br />
                        {item.goodsPrice} 원 / {item.goodsQuantity} 개
                      </div>
                      <div className='btn'>
                        <button className='btn1' onClick={() => addToCart(item, 1)}>
                          장바구니 담기
                        </button>
                        <button className='btn2' onClick={() => navigate('/user/mypage/delivery', { state: { goodsId: item.goodsId } })}>
                          배송조회
                        </button>
                        <button className='btn3' onClick={() => navigate('/user/mypage/withdraw')}>
                          주문취소
                        </button>
                        <button className='btn4' onClick={() => navigate('/user/mypage/review', { state: { goods: item } })}>
                          리뷰작성
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </OrderListComp>
  );
}
