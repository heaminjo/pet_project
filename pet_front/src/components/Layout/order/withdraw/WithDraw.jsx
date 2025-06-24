import styled from 'styled-components';

export default function WithDraw() {
  return (
    <WithDrawComp>
      <div className='container'>
        <h2>취소 요청 페이지</h2>

        <section className='select-product'>
          <h3>상품을 선택해 주세요</h3>
          <div className='product-box'>
            <input type='checkbox' />
            <img src='/images/sample.png' alt='상품' />
            <div className='info'>
              <p className='title'>상품명, 1개</p>
              <p className='count'>2개 중</p>
            </div>
            <select>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
          </div>
        </section>

        <section className='select-reason'>
          <h3>어떤 문제가 있나요?</h3>
          <fieldset>
            <legend>단순 변심</legend>
            <label>
              <input type='radio' name='reason' /> 상품이 마음에 들지 않음
            </label>
            <label>
              <input type='radio' name='reason' /> 더 저렴한 상품을 발견함
            </label>
          </fieldset>

          <fieldset>
            <legend>배송문제</legend>
            <label>
              <input type='radio' name='reason' /> 다른 상품이 배송됨
            </label>
            <label>
              <input type='radio' name='reason' /> 배송된 장소에 박스가 분실됨
            </label>
            <label>
              <input type='radio' name='reason' /> 다른 주소로 배송됨
            </label>
          </fieldset>

          <fieldset>
            <legend>상품문제</legend>
            <label>
              <input type='radio' name='reason' /> 상품의 구성품/부속품이 들어있지 않음
            </label>
            <label>
              <input type='radio' name='reason' /> 상품이 설명과 다름
            </label>
            <label>
              <input type='radio' name='reason' /> 상품이 파손되어 배송됨
            </label>
            <label>
              <input type='radio' name='reason' /> 상품 결함/기능에 이상이 있음
            </label>
          </fieldset>

          <div className='btn-group'>
            <button>이전 단계</button>
            <button disabled>다음 단계 </button>
          </div>
        </section>
      </div>
    </WithDrawComp>
  );
}
const WithDrawComp = styled.div`
  .container {
    max-width: 900px;
    margin: 100px auto;
    padding: 30px;
    background-color: #fffef2;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    font-family: 'Noto Sans KR', sans-serif;
    color: #333;
  }

  h2 {
    font-size: 26px;
    font-weight: bold;
    color: #444;
    margin-bottom: 40px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 20px 0 10px;
    color: #222;
  }

  .product-box {
    display: flex;
    align-items: center;
    border: 2px solid #f5de68;
    padding: 20px;
    border-radius: 10px;
    background-color: #fff9d9;
    margin-bottom: 30px;

    input[type='checkbox'] {
      margin-right: 15px;
      transform: scale(1.4);
    }

    img {
      width: 80px;
      height: 80px;
      margin-right: 15px;
      object-fit: contain;
    }

    .info {
      flex: 1;

      .title {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 5px;
      }

      .count {
        font-size: 14px;
        color: #666;
      }
    }

    select {
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }

  .next-btn {
    width: 100%;
    background-color: #f1cd38;
    color: #111;
    padding: 14px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 30px;
  }

  .select-reason {
    fieldset {
      border: none;
      margin-bottom: 25px;

      legend {
        font-weight: bold;
        font-size: 17px;
        margin-bottom: 12px;
        color: #222;
      }

      label {
        display: block;
        margin-bottom: 10px;
        font-size: 15px;
        cursor: pointer;

        input[type='radio'] {
          margin-right: 8px;
          transform: scale(1.2);
        }
      }
    }

    .btn-group {
      display: flex;
      justify-content: space-between;

      button {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 15px;
        cursor: pointer;
      }

      button:first-child {
        background-color: #fff;
        border: 2px solid #ddd;
        color: #333;
      }

      button:last-child {
        background-color: #f1cd38;
        color: #000;
      }

      button:disabled {
        background-color: #f0f0f0;
        color: #aaa;
        cursor: not-allowed;
      }
    }
  }
`;
