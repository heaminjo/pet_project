import { useNavigate, useParams } from 'react-router-dom';
import AddGoodsComp from './AddGoodsStyle';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';

export default function AddGoods({ onClose }) {
  const navigate = useNavigate();
  //const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';

  // 카테고리
  const [categories, setCategories] = useState([]);

  // 이미지 미리보기 위한 상태변수 추가
  const [prevImg, setPrevImg] = useState('http://localhost:8080/resources/webapp/userImages/basicimg.jpg');

  // form의 input 값들을 state로 관리하고
  // submit 버튼 클릭 시 axios.post()로 데이터 전송
  const [goods, setGoods] = useState({
    // input 값 연결용
    goodsName: '',
    imageFile: '',
    categoryId: '',
    goodsState: 'SALE',
    description: '',
    quantity: '',
    price: '',
  });

  // 상품등록 폼 제출
  const register = async (e) => {
    try {
      const response = GoodsApi.regGoods(goods);
      console.log('등록 결과:', response);
      onClose();
    } catch (error) {
      console.log('등록 중 에러 발생생:', error);
    }
  };

  // 카테고리 불러오기
  const category = async (e) => {
    try {
      const response = GoodsApi.getCategoryList();
      setCategories(response);
    } catch (error) {
      console.log('등록 중 에러 발생생:', error);
    }
  };

  // ESC 시 닫기
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose(); // 모달 닫기
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    category();
  }, []);

  return (
    <AddGoodsComp>
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
                      <input type='text' value={goods.goodsName} onChange={(e) => setGoods({ ...goods, goodsName: e.target.value })} />
                    </td>
                  </tr>
                  <tr>
                    <td>상품이미지</td>
                    <td>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setGoods({ ...goods, imageFile: file });
                          if (file) {
                            const imgUrl = URL.createObjectURL(file);
                            setPrevImg(imgUrl); // 미리보기용 이미지주소
                          } else {
                            setPrevImg(null);
                          }
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리</td>
                    <td>
                      <select value={goods.categoryId} onChange={(e) => setGoods({ ...goods, categoryId: e.target.value })}>
                        <option value=''>카테고리를 선택하세요</option>
                        {categories.length > 0 ? (
                          categories.map((cat) => (
                            <option value={cat.categoryId} key={cat.categoryId}>
                              {cat.categoryName}
                            </option>
                          ))
                        ) : (
                          <option disabled>등록된 카테고리가 없습니다</option>
                        )}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>상품 Description</td>
                    <td>
                      <input
                        type='text'
                        value={goods.description}
                        onChange={(e) => {
                          setGoods({ ...goods, description: e.target.value });
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>상태(SALE, SOLDOUT, HIDDEN)</td>
                    <td>
                      <select value={goods.goodsState} onChange={(e) => setGoods({ ...goods, goodsState: e.target.value })}>
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
                      <button type='button' onClick={onClose}>
                        닫기
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className='right'>
            <img src={prevImg} alt='상품 이미지' className='goodsImg' style={{ width: '300px', height: '300px' }} />
            <br />
          </div>
        </div>
      </div>
    </AddGoodsComp>
  );
}
