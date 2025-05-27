import { useNavigate, useParams } from 'react-router-dom';
import GoodsComp from './GoodsStyle';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function Cart() {
  const navigate = useNavigate();
  const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  // form의 input 값들을 state로 관리하고
  //submit 버튼 클릭 시 axios.post()로 데이터 전송
  const [goods, setGoods] = useState({
    // input 값 연결용
    name: '',
    img: '',
    category: '',
    desc: '',
    status: '',
    quantity: '',
    unit: '',
  });

  const register = async (e) => {
    e.preventDefault(); // form 기본 제출 막기
    GoodsApi.regGoods(goods);
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
                      <input type='text' value={goods.name} onChange={(e) => setGoods({ ...goods, name: e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>상품이미지</td>
                    <td>
                      <input type='text' value={goods.img} onChange={(e) => setGoods({ ...goods, img: e.target.value })} />
                      <button onClick={() => {}}>등록</button>
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리</td>
                    <td>
                      <select value={goods.category} onChange={(e) => setGoods({ ...goods, category: e.target.value })}>
                        <option value=''> 선택 </option>
                        <option value='cat1'>상품 카테고리1</option>
                        <option value='cat2'>상품 카테고리2</option>
                        <option value='cat3'>상품 카테고리3</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>상품 Description</td>
                    <td>
                      <input type='text' value={goods.desc} onChange={(e) => setGoods({ ...goods, desc: e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>상태(SALE, SOLDOUT, HIDDEN)</td>
                    <td>
                      <select value={goods.status} onChange={(e) => setGoods({ ...goods, status: e.target.value })}>
                        <option value=''> 선택 </option>
                        <option value='SALE'>SALE</option>
                        <option value='SOLDOUT'>SOLDOUT</option>
                        <option value='HIDDEN'>HIDDEN</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>판매 기본단위</td>
                    <td>
                      <input type='text' value={goods.quantity} onChange={(e) => setGoods({ ...goods, quantity: e.target.value })} /> &nbsp;&nbsp;
                      <select value={goods.unit} onChange={(e) => setGoods({ ...goods, unit: e.target.value })}>
                        <option value=''> 단위 선택 </option>
                        <option value='kg'>kg</option>
                        <option value='num'>개</option>
                      </select>
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
