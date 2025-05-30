import { useNavigate, useParams } from 'react-router-dom';
import GoodsComp from './GoodsStyle';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function Goods() {
  const navigate = useNavigate();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  // form의 input 값들을 state로 관리하고
  //submit 버튼 클릭 시 axios.post()로 데이터 전송
  const [goods, setGoods] = useState({
    // input 값 연결용
    goods_name: '',
    image_file: '',
    category_id: '',
    goods_state: 'SALE',
    description: '',
    quantity: '',
    price: '',
  });

  const register = async (e) => {
    e.preventDefault(); // form 기본 제출 막기
    const response = GoodsApi.regGoods(goods);
    console.log('등록 결과:', response);
    navigate('/');
  };

  return (
    <GoodsComp>
      <div className='container'>
        <h2>[관리자 페이지] 상품등록 페이지</h2>
        <span>설명: 관리자가 상품에 대한 상세정보를 입력하고 등록하는 페이지</span>
        <hr />
        <div className='register-form'>
          <div className='left'>
            <form onSubmit={register} method='post'>
              <table>
                <tbody>
                  <tr>
                    <td>상품명</td>
                    <td>
                      <input type='text' value={goods.goods_name} onChange={(e) => setGoods({ ...goods, goods_name: e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>상품이미지</td>
                    <td>
                      <input type='text' value={goodsImg} readOnly />
                      {/* <button onClick={() => {}}>등록</button> */}
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리</td>
                    <td>
                      <select value={goods.category_id} onChange={(e) => setGoods({ ...goods, category_id: e.target.value })}>
                        <option value=''> 선택 </option>
                        <option value='1'>1 : 사료</option>
                        <option value='2'>2 : 간식</option>
                        <option value='3'>3 : 장난감</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>상품 Description</td>
                    <td>
                      <input type='text' value={goods.description} onChange={(e) => setGoods({ ...goods, description: e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>상태(SALE, SOLDOUT, HIDDEN)</td>
                    <td>
                      <select value={goods.goods_state} onChange={(e) => setGoods({ ...goods, goods_state: e.target.value })}>
                        <option value='SALE'>SALE</option>
                        <option value='SOLDOUT'>SOLDOUT</option>
                        <option value='HIDDEN'>HIDDEN</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>기본 판매 수량(단위)</td>
                    <td>
                      <input type='text' value={goods.quantity} onChange={(e) => setGoods({ ...goods, quantity: e.target.value })} /> &nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>판매 가격</td>
                    <td>
                      <input type='text' value={goods.price} onChange={(e) => setGoods({ ...goods, price: e.target.value })} /> &nbsp;&nbsp;
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
