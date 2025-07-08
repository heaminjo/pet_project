import { useNavigate, useParams } from 'react-router-dom';
import AddGoodsComp from './AddGoodsStyle';
import { useEffect, useState } from 'react';
import GoodsApi from '../../../api/GoodsApi';
import GoodsComp from './AddGoodsStyle';

import { API_BASE_URL } from '../../../services/app-config';
// const KH_DOMAIN = 'http://localhost:8080'; // 개발용
const KH_DOMAIN = `${API_BASE_URL}`; // 배포용

export default function AddGoods({ onClose, refreshList, mode = 'create', targetGoods = null }) {
  const navigate = useNavigate();
  //const goodsImg = process.env.PUBLIC_URL + '/images/pic1.png';
  const imgUrl = `${KH_DOMAIN}/resources/webapp/userImages/`;
  // 카테고리
  const [categories, setCategories] = useState([]);

  // 이미지 미리보기 위한 상태변수
  const [prevImg, setPrevImg] = useState(`${KH_DOMAIN}/resources/webapp/userImages/basicimg.jpg`);

  // form의 input 값들을 state로 관리하고
  // submit 버튼 클릭 시 axios.post()로 데이터 전송
  const [goods, setGoods] = useState({
    goodsName: '',
    imageFile: null,
    categoryId: '',
    goodsState: 'SALE',
    description: '',
    quantity: '',
    price: '',
  });

  // 상품등록 & 수정 폼 제출
  const register = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'edit') {
        const formData = new FormData();

        const updatedGoods = {
          goodsId: targetGoods.goodsId,
          goodsName: goods.goodsName,
          categoryId: goods.categoryId,
          goodsState: goods.goodsState,
          description: goods.description,
          quantity: goods.quantity,
          price: goods.price,
        };

        formData.append(
          'goods',
          new Blob([JSON.stringify(updatedGoods)], {
            type: 'application/json',
          })
        );

        if (goods.imageFile) {
          formData.append('imageFile', goods.imageFile);
        }

        await GoodsApi.modifyGoods(formData);
      } else {
        const formData = new FormData();
        formData.append(
          'goods',
          new Blob(
            [
              JSON.stringify({
                goodsName: goods.goodsName,
                categoryId: goods.categoryId,
                goodsState: goods.goodsState,
                description: goods.description,
                quantity: goods.quantity,
                price: goods.price,
              }),
            ],
            { type: 'application/json' }
          )
        );
        if (goods.imageFile) formData.append('imageFile', goods.imageFile);
        await GoodsApi.regGoods(formData);
      }
      onClose(); // 모달 닫기
      refreshList(); // 목록 새로고침
    } catch (err) {
      console.error('에러:', err);
    }
  };

  // 카테고리 불러오기
  const category = async (e) => {
    try {
      const response = await GoodsApi.getCategoryList();
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
    if (mode === 'edit' && targetGoods) {
      setGoods({
        goodsName: targetGoods.goodsName,
        imageFile: null,
        categoryId: targetGoods.category?.categoryId || '',
        goodsState: targetGoods.goodsState,
        description: targetGoods.description,
        quantity: targetGoods.quantity,
        price: targetGoods.price,
      });
      setPrevImg(`${KH_DOMAIN}/resources/webapp/userImages/${targetGoods.imageFile}`);
    }
  }, [mode, targetGoods]);

  useEffect(() => {
    category();
  }, []);

  return (
    <GoodsComp>
      <div className='container'>
        <h2>상품등록 페이지</h2>
        <span>신규 상품을 등록할 수 있습니다.</span>
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
                      <button className='submit-btn' id='sub_btn' type='submit'>
                        {mode === 'edit' ? '수정' : '등록'}
                      </button>
                      <button className='exit-btn' type='button' onClick={onClose}>
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
    </GoodsComp>
  );
}
