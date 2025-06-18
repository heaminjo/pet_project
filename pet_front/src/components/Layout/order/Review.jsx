import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoodsApi from '../../../api/GoodsApi';
import OrderApi from '../../../api/OrderApi';
import PageNumber from '../../util/PageNumber';
import { useLocation, useNavigate } from 'react-router-dom';

const ReviewComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    color: #333;
  }

  /* 기본 라인 정리 */
  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 20px 0;
  }

  /* 섹션 타이틀 */
  .container h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  .rating {
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 12px;
    margin-top: 8px;
  }

  /* 상품 품질 리뷰 제목 */
  .prod-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin: 16px 0;
  }

  .prod-info div:nth-child(2) {
    font-weight: bold;
  }

  .prod-info div:nth-child(3) {
    color: #f39c12;
    font-size: 18px;
  }

  /* 질문 섹션 */
  .question fieldset {
    border: none;
    margin-bottom: 24px;
  }

  .question legend {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .question label {
    display: block;
    margin-left: 12px;
    margin-top: 4px;
    font-size: 14px;
  }

  /* 상세 리뷰 입력 */
  .reviews {
    border: none;
  }

  .reviews legend {
    font-size: 16px;
    font-weight: bold;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .comment {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }

  .contents {
    width: 100%;
    height: 150px;
    padding: 10px;
    font-size: 14px;
    resize: vertical;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  /* 사진 첨부 영역 */
  .user-img {
    border: none;
    margin-top: 24px;
  }

  .user-img legend {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user-img button {
    background-color: #2563eb;
    color: white;
    border: none;
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  .user-img button:hover {
    background-color: #1d4ed8;
  }
`;

// 리뷰 페이지
export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 상 태 변 수 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 이미지 미리보기 위한 상태변수 추가
  const [prevImg, setPrevImg] = useState('http://localhost:8080/resources/webapp/userImages/basicimg.jpg');

  const { goods } = location.state || {};
  const [activeTab, setActiveTab] = useState('상품상세');
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState([]);
  const [content, setContent] = useState([]);
  const [userImage, setUserImage] = useState([]);
  const imgUrl = 'http://localhost:8080/resources/webapp/userImages/';
  const up = 'up.png';
  const down = 'down.png';
  const prodImg = 'istockphoto-1320314988-2048x2048.jpg';
  // c:\devv\pet_project\pet_back\src\main\resources\webapp\userImages\up.png

  // 별점 (배열)
  const [stars, setStars] = useState(); // ⭐

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
  };

  // 보여줄 데이터
  const data = [
    { label: '리뷰 작성', value: goods.goodsName },
    { label: '작성한 리뷰', value: goods.description },
  ];

  // 리뷰등록
  const regReview = async (reviews) => {
    const review = {
      memberId: '',
      goodsId: goods.goodsId,
      orderDetailId: '',
      score: '',
      title: comment,
      content: content,
      imageFile: reviews.imageFile,
    };
    try {
      console.log(`goodsId = ${reviews.goodsId}`)
      const response = await OrderApi.registerReview(review);
      alert(response); // 리뷰가 정상적으로 등록되었습니다.
      navigate('/');
    } catch (err) {
      console.error('리뷰 등록 실패', err);
      alert('리뷰 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <ReviewComp>
      <div className='container'>
        <h2>리뷰작성 페이지</h2>
        <div>서비스, 품질, 배송 등 전체적인 서비스는 어떠셨나요?</div>
        <hr />
        <div className='rating'>
          만족도 &nbsp;&nbsp;
          <img src={`${imgUrl}${up}`} alt='' />
          <img src={`${imgUrl}${down}`} alt='' />
        </div>
        <hr />
        <div>상품 품질 리뷰</div>
        <div>이 상품의 품질에 대해서 얼마나 만족하시나요?</div>
        <hr />
        <div className='prod-info'>
          <img src={`${imgUrl}${prodImg}`} alt='' style={{ width: '100px', height: '100px' }} className='prod-img' />
          <div>{goods.goodsName}</div>
          <div>{goods.description}</div>
          <div>★★</div>
        </div>
        <hr />

        {/* <form className='question'>
          <fieldset className='q1'>
            <legend>
              <strong>판매자의 서비스는 어땠나요?</strong> 
            <label>
              <input type='radio' name='install' value='easy' /> 친절
            </label>
            <br />
            <label>
              <input type='radio' name='install' value='normal' /> 보통
            </label>
            <br />
            <label>
              <input type='radio' name='install' value='difficult' /> 불친절
            </label>
          </fieldset>

          <fieldset className='q2'>
            <legend>
              <strong>상품의 품질은 어땠나요?</strong>
            </legend>
            <label>
              <input type='radio' name='upper' value='up' /> 상
            </label>
            <br />
            <label>
              <input type='radio' name='middle' value='okay' /> 중
            </label>
            <br />
            <label>
              <input type='radio' name='lower' value='slow' /> 하하
            </label>
          </fieldset>

          <fieldset className='q3'>
            <legend>
              <strong>배송 속도는 어땠나요 ?</strong> 
            </legend>
            <label>
              <input type='radio' name='speed' value='fast' /> 빠름
            </label>
            <br />
            <label>
              <input type='radio' name='speed' value='okay' /> 보통
            </label>
            <br />
            <label>
              <input type='radio' name='speed' value='slow' /> 느림
            </label>
          </fieldset>
        </form> */}
        <hr />
        <form>
          <fieldset className='reviews'>
            <legend>
              <strong>한줄요약</strong>
            </legend>
            <label>
              <input type='text' name='title' className='comment' value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>
            <hr />
            <legend>
              <strong>상세 리뷰</strong>
            </legend>
            <label>
              <textarea name='contents' className='contents' value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
          </fieldset>
        </form>
        <hr />

        <form>
          <fieldset className='user-img'>
            <legend>
              <strong>사진 첨부</strong>{' '}
              <input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files[0];
                  setReviews({ ...regReview, imageFile: file });
                  if (file) {
                    const imgUrl = URL.createObjectURL(file);
                    setPrevImg(imgUrl); // 미리보기용 이미지주소
                  } else {
                    setPrevImg(prevImg);
                  }
                }}
              />
            </legend>
            <div>
              <img src={prevImg} alt='상품 이미지' className='goodsImg' style={{ width: '200px', height: '200px' }} />
            </div>
          </fieldset>
        </form>
        <section>
          <button className='pay' onClick={() => regReview(reviews)}>
            리뷰등록
          </button>
          &nbsp;&nbsp;{' '}
          <button className='cancel' onClick={() => navigate('/')}>
            취소
          </button>
        </section>

        {/* <table className='review-table'>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <th className='review-th'>{item.label}</th>
                <td className='review-td'>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
        {/* <PageNumber page={page} setPage={setPage} paging={paging} /> */}
      </div>
    </ReviewComp>
  );
}
