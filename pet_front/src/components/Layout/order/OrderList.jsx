import OrderListComp from './OrderListStyle';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageNumber from '../../util/PageNumber';
import Modal from '../../../modal/Modal';
import Popup from './pay/Popup';

export default function OrderDetail() {
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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 주문취소 모달 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [isOpen, setIsOpen] = useState(false);
  const [reasonType, setReasonType] = useState(''); // 유형 (취소, 반품, 교환)
  const [reasonDetail, setReasonDetail] = useState(''); // 상세 사유

  const [targetOrderId, setTargetOrderId] = useState(null);
  const [targetOrderDetailId, setTargetOrderDetailId] = useState(null);

  // 모달 핸들러 함수
  const goToCart = () => {
    setShowModal(false);
    navigate('/user/mypage/cart/list');
  };

  // 팝업 Open / Close
  const handleWithDraw = () => {
    setIsOpen(false); // 팝업창 닫음
    withDraw(); //
  };

  // 입력 창
  const handleOpenPopup = () => {
    return (
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3>처리 유형 선택</h3>
        <select value={reasonType} onChange={(e) => setReasonType(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}>
          <option value=''>선택하세요</option>
          <option value='WITHDRAW'>주문취소</option>
          <option value='REFUND'>반품요청</option>
          <option value='EXCHANGE'>교환요청</option>
        </select>
        <br />
        <h3>상세 사유 입력</h3>
        <textarea value={reasonDetail} onChange={(e) => setReasonDetail(e.target.value)} rows={4} style={{ width: '100%' }} placeholder='상세 사유를 입력하세요' />
        <br />
        <button onClick={handleWithDraw}>저장</button>
      </Popup>
    );
  };

  // 주문취소 수행
  const withDraw = async () => {
    try {
      const payload = {
        memberId: '',
        goodsId: '',
        orderId: targetOrderId,
        orderDetailId: targetOrderDetailId,
        quantity: '',
        reasonType: reasonType, // 예: 'REFUND'
        reasonDetail: reasonDetail, // 예: "상품 불량"
        returnDate: '',
      };
      const result = await OrderApi.withDraw(payload);
      // result의 반환타입은 boolean임,  True: 취소반영 완료, False: 불가
      if (!result) {
      }
      await getPageList();
      setPage(0);
      setIsOpen(false);
    } catch (err) {
      console.error('OrderApi.withDraw 호출 실패: ', err);
    }
  };

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

  // ~~~~~~~~~~~~~~~~~ 주문내역 리스트를 순회하며 날짜별로 그룹화 ~~~~~~~~~~~~~~~~~~~~
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
      const response = await OrderApi.getOrderDetailPageList(pages);
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
      console.error('OrderApi.getOrderDetailPageList(pages) 실패:', err);
    }
  };

  useEffect(() => {
    getPageList();
  }, [page]);

  return (
    <OrderListComp>
      <div className='orderlist-container'>
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
                  <div className='orderstate'>
                    {date}
                    {isOpen && item.orderDetailId === targetOrderDetailId && handleOpenPopup()} {/* 모달 오픈조건 && 현재 반복문 ID 일치시 팝업 모달 창 띄움 */}
                  </div>
                  <div className='orderlist2'>
                    <div className='orderdesc'>
                      <img src={`${item.imageFile}`} alt={item.goodsName} className='prodimg' onClick={() => navigate('/user/order', { state: { goods: item } })} />
                      <br />
                      <div className='proddesc'>
                        {item.status === '결제완료' ? <b> {item.status}</b> : <b style={{ color: 'red' }}>{item.status}</b>}
                        <br />
                        {item.goodsId}
                        {item.goodsName} <br />
                        {item.goodsPrice} 원 / {item.goodsQuantity} 개
                      </div>
                      <div className='btn'>
                        <button
                          className='btn3'
                          onClick={async () => {
                            try {
                              const status = await OrderApi.deliveryStatus(item.orderDetailId); // 주문상태 조회
                              const cancellableStates = ['BEFOREPAY', 'AFTERPAY', 'READY'];
                              if (cancellableStates.includes(status)) {
                                setTargetOrderId(item.orderId);
                                setTargetOrderDetailId(item.orderDetailId);
                                setIsOpen(true);
                              } else if (status === 'DELIVERY') {
                                alert('해당 주문은 이미 배송이 시작되어 취소가 불가합니다.');
                              } else if (status === 'END') {
                                alert('해당 주문은 배송이 완료되어 취소가 불가합니다.');
                              }
                            } catch (err) {
                              console.error('배송 상태 조회 실패:', err);
                              alert('주문 상태를 확인하는 데 실패했습니다.');
                            }
                          }}>
                          주문취소
                        </button>
                        <button className='btn1' onClick={() => addToCart(item, 1)}>
                          장바구니 담기
                        </button>
                        <button className='btn2' onClick={() => navigate(`/user/mypage/delivery?orderDetailId=${item.orderDetailId}`)}>
                          배송조회
                        </button>

                        {item.reviewId ? (
                          // <button className='btn4' onClick={() => navigate(`/user/mypage/review?reviewId=${item.reviewId}`)}>
                          //   리뷰수정
                          // </button>
                          <button
                            className='btn4'
                            onClick={() =>
                              navigate('/user/mypage/review', {
                                state: { orderDetail: item, review: item.review },
                              })
                            }>
                            리뷰수정
                          </button>
                        ) : (
                          <button className='btn4' onClick={() => navigate('/user/mypage/review', { state: { orderDetail: item } })}>
                            리뷰작성
                          </button>
                        )}
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
