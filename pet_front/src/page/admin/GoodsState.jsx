import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoodsApi from '../../api/GoodsApi';
import GoodsSearch from '../../components/util/GoodsSearch';
import PageNumber from '../../components/util/PageNumber';
import React from 'react';
import AdminApi from '../../api/AdminApi';

export default function GoodsState() {
  const [categoryList, setCategoryList] = useState([]);
  const [goodsList, setGoodsList] = useState([]);

  //페이지
  const [category, setCategory] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [state, setState] = useState('all');
  const [paging, setPaging] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    getCategoryList();
    getGoodsList();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, category, state]);

  const getCategoryList = async () => {
    const result = await GoodsApi.getCategoryList();
    setCategoryList(result);
    console.log(result);
  };
  //상품 목록 가져오기
  const getGoodsList = async () => {
    const pages = {
      page: page,
      size: 10,
      keyword: keyword,
      category: category,
      state: state,
    };
    const result = await GoodsApi.getGoodsList(pages);
    setGoodsList(result.content);

    let temp = Math.floor(page / 5) * 5;

    //페이지번호 정보 저장
    setPaging({
      start: temp,
      end: Math.min(temp + 5, result.totalPages),
      isPrev: result.prev,
      isNext: result.next,
      totalElement: result.totalElements,
      totalPages: result.totalPages,
    });
  };

  //상품 업데이트
  const updateState = async (id, prevState, newState) => {
    //만약 현재 상태와 같다면 그냥 두고 같지않다면 변경 API 호출
    if (prevState != newState) {
      await AdminApi.updateGoodsState(id, newState);
      getGoodsList();
    }
  };
  return (
    <StateComp>
      <h2>상태관리</h2>
      <div className='inventory_container'>
        <GoodsSearch categoryList={categoryList} setGoodsList={setGoodsList} getGoodsList={getGoodsList} setCategory={setCategory} setKeyword={setKeyword} setState={setState} />
        <div className='list_container'>
          <table>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>상품 사진</th>
              <th>수량</th>
              <th>상태</th>
            </tr>
            {goodsList.length > 0 ? (
              <React.Fragment>
                {goodsList.map((g, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{g.goodsName}</td>
                    <td>
                      <img src={g.imageFile} alt='상품 이미지' />
                    </td>
                    <td>{g.quantity}</td>
                    <td>
                      {['판매', '품절', '숨김'].map((state) => (
                        <button key={state} onClick={() => updateState(g.goodsId, g.goodsState, state)} className={g.goodsState === state ? 'btn active' : 'btn'}>
                          {state}
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ) : (
              <tr>
                <td colSpan={8}>조회되는 상품이 없습니다.</td>
              </tr>
            )}
          </table>
        </div>

        <PageNumber page={page} setPage={setPage} paging={paging} />
      </div>
    </StateComp>
  );
}
const StateComp = styled.div`
  height: 1150px;
  .inventory_container {
    width: 1000px;
    padding: 20px 0;

    .list_container {
      width: 1000px;
      table {
        border: 1px solid #000;
        width: 1000px;
        text-align: center;
        border-collapse: collapse;
        padding-bottom: 20px;
        tr {
          height: 50px;
          th {
            background-color: #b0befc;
          }
          td {
            border-bottom: 1px solid #ccc;
            img {
              width: 80px;
              height: 80px;
            }
          }
          td:nth-last-child(1) {
            button {
              width: 60px;
              height: 40px;
              border: none;
              cursor: pointer;
              font-weight: bold;
            }
            .active {
              background-color: #ff8c8c;
            }
          }
        }
      }
    }
  }
`;
