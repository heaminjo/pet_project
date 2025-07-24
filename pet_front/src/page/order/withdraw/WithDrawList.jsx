import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageNumber from '../../../components/util/PageNumber';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import Modal from '../../../modal/Modal';

export default function WithDrawList() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  const location = useLocation();
  const prodImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const navigate = useNavigate();

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 페이징 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 페이징 관련 상태변수
  const [type, setType] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(0); // 1 페이지, 2 페이지, ...
  const [info, setInfo] = useState([]); // OrderDetailResponseDTO List

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
      if (sessionStorage.getItem('loginName') != null) {
        const response = await GoodsApi.addToCart(goods, buyQuantity);
        // alert('장바구니에 ' + goods.goodsName + '이(가) 1개 담겼습니다.');
        // navigate("/user/mypage/cart/list");
        setShowModal(true); // 모달 표시
      } else {
        alert('로그인이 필요한 서비스입니다.');
      }
    } catch (err) {
      alert('장바구니 담기에 실패했습니다.');
    }
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 모 달 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [showModal, setShowModal] = useState(false); // Y/N
  // 모달 핸들러 함수
  const goToCart = () => {
    setShowModal(false);
    navigate('/user/mypage/cart/list');
  };
  // ~~~~~~~~~~~~~~~~~ 내역 리스트를 순회하며 날짜별로 그룹화 ~~~~~~~~~~~~~~~~~~~~
  const groupByDate = (info) => {
    const grouped = {};
    info.forEach((item) => {
      const dateKey = new Date(item.returnDate).toISOString().split('T')[0]; // 'YYYY-MM-DD'
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
      const response = await OrderApi.getWithDrawPageList(pages); // WithdrawResponseDTO
      console.log(`OrderApi.getWithDrawPageList(pages) response = `, response);
      console.log(`OrderApi.getWithDrawPageList(pages) response.content = `, response.content);
      if (Array.isArray(response?.content)) {
        setInfo(response.content);
        console.log(`OrderApi.getWithDrawPageList(pages) response = `, info);
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
      console.error('OrderApi.getWithDrawPageList(pages) 실패:', err);
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
              {groupedInfo[date].map((item, index) => (
                <div key={item.orderDetailId} className='ordertitle'>
                  <div className='orderstate'>
                    {item.returnDate}
                    &nbsp;&nbsp;&nbsp;&nbsp;{item.orderDetailResponseDTO.status}
                  </div>
                  <div className='orderlist2'>
                    <div className='orderdesc'>
                      <img src={`${item.orderDetailResponseDTO.imageFile}`} alt={item.orderDetailResponseDTO.goodsName} className='prodimg' onClick={() => navigate('/user/order', { state: { goods: item } })} />
                      <br />
                      <div className='proddesc'>
                        유형 &nbsp;&nbsp;{item.orderDetailResponseDTO.status === '취소완료' ? <b> {item.orderDetailResponseDTO.status}</b> : <b style={{ color: 'red' }}>{item.orderDetailResponseDTO.status}</b>}
                        <br />
                        {item.orderDetailResponseDTO.goodsName} <br />
                        {item.orderDetailResponseDTO.goodsPrice} 원 / {item.orderDetailResponseDTO.goodsQuantity} 개
                      </div>
                      <div className='btn'>
                        <button className='btn1' onClick={() => addToCart(item, 1)}>
                          장바구니 담기
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
    </WithDrawListComp>
  );
}

const WithDrawListComp = styled.div`
  .container {
    width: 100%;
    margin: 30px auto;
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 24px;
    font-weight: 600;
  }

  .orderlist {
    width: 800px;
    margin-bottom: 30px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }

  .ordertitle {
    padding: 0 10px;
  }

  .orderstate {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #666;
    font-size: 1.1rem;
    font-weight: 600;
  }

  .orderlist2 {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 12px 0;
    border-top: 1px solid #eee;
  }

  .orderdesc {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 20px;
  }

  .prodimg {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
    border: 1px solid #ccc;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.25s ease;
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
      font-weight: 600;
      color: #333;
    }
  }

  .btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    min-width: 150px;

    button {
      background: #ffaaaa;
      width: 200px;
      height: 40px;
      padding: 8px 12px;
      font-size: 0.9rem;
      font-weight: 500;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background: rgb(255, 145, 145);
    }
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 16px 0;
  }
`;
