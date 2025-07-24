import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AddGoods from './AddGoods';
import React, { useEffect, useState } from 'react';
import GoodsApi from '../../api/GoodsApi';
import styled from 'styled-components';
import PageNumber from '../../components/util/PageNumber';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Modal from '../../modal/Modal.jsx';

export default function ModifyGoods() {
  const navigate = useNavigate();
  const location = useLocation();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const [stars, setStars] = useState(); // ⭐

  const [goods, setGoods] = useState([]); // 페이지에 사용되는 goods
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('desc');

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 모 달 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [deleteTarget, setDeleteTarget] = useState(null); // 삭제 대상 상품 ID
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false); // 삭제 확인 모달

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [editMode, setEditMode] = useState(false); // 등록 & 수정 모드 토글
  const [selectedGoods, setSelectedGoods] = useState(null); // 수정할 상품 정보

  // 팝업
  const [showModal, setShowModal] = useState(false);

  // 페이징 정보 상태변수 (현재 페이징 상태 핸들링 위함)
  const [paging, setPaging] = useState({
    start: 0,
    end: 4,
    isPrev: false,
    isNext: true,
    totalElement: 0,
    totalPages: 0,
  });

  // 별점 (배열)
  const renderStars = (rating) => {
    // return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    const stars = [];
    const fullStars = Math.floor(rating); // 채운 별 수
    const emptyStars = 5 - fullStars; // 빈 별 수
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color='gold' size={30} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color='lightgray' size={30} />);
    }
    return stars;
  };

  // 페이징
  const getPageList = async () => {
    const pages = {
      page,
      size: 10,
      sortBy: sort,
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

  // 상품1개 클릭시
  const clickProd = (item) => {
    alert(`clickProd 선택된 상품: ${item.goodsId}, ${item.goodsName}, ${item.goodsState}, ${item.description}, ${item.price}`);
    navigate('/goods/order', { state: { goods: item } });
  };

  // 상품 수정
  const modify = async (item) => {
    try {
      const result = await GoodsApi.modifyGoods(item);
      // 결과
    } catch (err) {
      console.error('getPageList 실패: ', err);
    }
  };

  // 상품 삭제
  const deleteGoods = async (goodsId) => {
    try {
      const result = await GoodsApi.deleteGoods(goodsId);
      await getPageList();
    } catch (err) {
      console.error('getPageList 실패: ', err);
    }
  };

  // 페이징
  useEffect(() => {
    getPageList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  // 모달
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'; // 스크롤 비활성화
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 복구
    }

    return () => {
      document.body.style.overflow = 'auto'; // 컴포넌트 언마운트시 복구
    };
  }, [showModal]);

  return (
    <ModifyGoodsComp>
      <div className='container'>
        <h2>상품 수정 / 삭제 </h2>
        <span>등록된 상품의 정보를 변경 및 삭제할 수 있습니다.</span>
        <hr />
        <button
          style={{ width: '200px', height: '50px' }}
          onClick={() => {
            setEditMode(false); // 등록모드
            setSelectedGoods(null);
            setShowModal(true);
          }}
          className='add-btn'>
          + 상품 추가
        </button>
        <ModalStyles>
          {showModal && (
            <div className='modal-backdrop' onClick={() => setShowModal(false)}>
              <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <AddGoods
                  mode={editMode ? 'edit' : 'create'} // 등록 & 수정 모드 토글
                  targetGoods={selectedGoods}
                  onClose={() => setShowModal(false)}
                  refreshList={getPageList} // 리스트 새로고침 함수 전달
                />
              </div>
            </div>
          )}
        </ModalStyles>

        <section className='list'>
          {Array.isArray(goods) &&
            goods?.map((item, index) => (
              <div
                className='goodslist'
                key={index}
                // onClick={() => clickProd(item)}
              >
                <div className='prodimg'>
                  <img src={`${item.imageFile}`} alt={item.goodsName} />
                </div>
                <div className='goodsdetail'>
                  <div>
                    <b>{item.goodsName} </b>
                  </div>
                  <div>
                    {item.description} {', '}
                    {item.quantity} 개
                  </div>
                  <div>{item.price} 원</div>
                  <div>
                    <span style={{ color: 'red', fontSize: '20px' }}>
                      {renderStars(item.rating)}
                      {' ( ' + item.reviewNum + ' )'}
                    </span>
                  </div>
                </div>
                <div className='modify'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 부모 클릭 방지
                      setEditMode(true); // 수정모드
                      setSelectedGoods(item); // 선택된 상품 정보
                      setShowModal(true);
                    }}
                    className='modify-btn'>
                    수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 부모 클릭 방지
                      setDeleteTarget(item.goodsId); // 삭제할 상품 ID 저장
                      setConfirmDeleteModal(true); // 모달 오픈
                      // deleteGoods(item.goodsId);
                    }}
                    className='cancel-btn'>
                    삭제
                  </button>
                </div>
              </div>
            ))}
        </section>
        <PageNumber page={page} setPage={setPage} paging={paging} />
        {/* 삭제 확인 모달 */}
        {confirmDeleteModal && (
          <Modal
            content='정말 삭제하시겠습니까?'
            clickEvt={async () => {
              await deleteGoods(deleteTarget);
              setConfirmDeleteModal(false);
            }}
            setModal={setConfirmDeleteModal}
          />
        )}
      </div>
    </ModifyGoodsComp>
  );
}

const ModalStyles = styled.div`
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .modal-content {
    background-color: white;
    width: 1000px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
    border-radius: 10px;
  }
`;
const ModifyGoodsComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
    font-family: 'Noto Sans KR', sans-serif;

    h2 {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    span {
      display: block;
      margin-bottom: 20px;
      color: #666;
    }

    .add-btn,
    .modify-btn,
    .cancel-btn {
      background-color: #ffaaaa;
      color: #333;
      border: none;
      border-radius: 5px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease;
    }

    .add-btn:hover,
    .modify-btn:hover,
    .cancel-btn:hover {
      background-color: rgb(255, 145, 145);
    }

    .list {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 30px;
      margin-bottom: 60px;
    }

    .goodslist {
      display: flex;
      align-items: center;
      padding: 16px;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      background-color: #fff;
      transition: box-shadow 0.2s;
      &:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
      }

      .prodimg {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #eee;
          transition: transform 0.3s ease;
        }
        img:hover {
          transform: scale(1.05);
        }
      }

      .goodsdetail {
        width: 450px;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        font-size: 14px;
        color: #444;

        b {
          font-size: 16px;
          color: #222;
        }
      }

      .modify {
        width: 150px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;

        button {
          width: 100%;
          height: 40px;
          font-size: 14px;
        }
      }
    }
  }
`;
