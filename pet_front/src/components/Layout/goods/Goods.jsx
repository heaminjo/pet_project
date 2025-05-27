import { useNavigate, useParams } from 'react-router-dom';
import GoodsComp from './GoodsStyle';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function Cart() {
  const navigate = useNavigate();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const [goods, setGoods] = useState();
  const register = () => {
    GoodsApi.regGoods();
  };

  return (
    <GoodsComp>
      <div className='container'>
        <h2>[관리자 페이지] 상품등록 페이지</h2>
        <span>설명: 관리자가 상품에 대한 상세정보를 입력하고 등록하는 페이지</span>
        <hr />
        <div className='register-form'>
          <div className='left'>
            <form onSubmit={() => register()}>
              <table>
                <tbody>
                  <tr>
                    <td>상품명</td>
                    <td>
                      <input type='text' />
                    </td>
                  </tr>
                  <tr>
                    <td>상품이미지</td>
                    <td>
                      <input type='text' />
                      <button onClick={() => {}}>등록</button>
                    </td>
                  </tr>
                  <tr>
                    <td>판매수량</td>
                    <td>
                      <input type='text' />
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리</td>
                    <td>
                      <input type='text' />
                    </td>
                  </tr>
                  <tr>
                    <td>상품 Description</td>
                    <td>
                      <input type='text' />
                    </td>
                  </tr>
                  <tr>
                    <td>상태(SALE, SOLDOUT, HIDDEN)</td>
                    <td>
                      <input type='text' />
                    </td>
                  </tr>
                  <tr>
                    <td>판매 기본단위</td>
                    <td>
                      <input type='text' />
                    </td>
                  </tr>
                  <tr id='tr_btn'>
                    <td></td>
                    <td>
                      <button className='btn' id='sub_btn' type='submit'>
                        등록
                      </button>
                      <button className='btn' id='reset_btn' type='reset'>
                        취소
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className='right'>
            <img src={goodsImg} alt='' className='goodsImg' />
            <br />
            상품이미지 미리보기
          </div>
        </div>
        <hr />
      </div>
    </GoodsComp>
  );
}
