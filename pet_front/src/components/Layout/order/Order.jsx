import { useState } from 'react';
import OrderComp from './OrderStyle.js';

export default function Order() {
  const prodImage = process.env.PUBLIC_URL + '/images/pic2.png';
  const [select, setSelect] = useState(false);
  const [menu, setMenu] = useState({ label: '10kg', price: '10000 원' });

  const handleSelect = (option) => {
    if (!option.disabled) {
      setMenu(option);
      setSelect(false);
    }
  };

  const options = [
    {
      label: '10kg',
      price: '10000',
      note: '',
      disabled: true,
    },
    {
      label: '5kg',
      price: '5000',
      note: '',
      disabled: false,
    },
  ];

  return (
    <OrderComp>
      <div className='container'>
        <h2>주문 페이지</h2>
        <section className='product'>
          <div className='left'>
            <img src={prodImage} alt='상품이미지' className='prodimage' />
          </div>
          <div className='right'>
            <div className='prodname'>사료 이름</div>
            <p className='rating'>⭐ 11,624개 상품평</p>
            <hr />
            <div className='prodprice'>
              {options.price} 10000 원 <span className='prodprice2'>(1kg당 1000원)</span>
            </div>
            <hr />
            <div className='seller'>
              <img src={prodImage} alt='상품이미지' className='sellerimg' />
              판매자 &nbsp;&nbsp; ROYAL CANIN
            </div>
            <br />
            <hr />
            <select className='options'>
              {options.map((opt, idx) => (
                <div key={idx} className={`{opt.disabled ? 'disabled': : ''}`} onClick={() => handleSelect(opt)}>
                  <option>
                    {opt.label} - {opt.price}원
                  </option>
                </div>
              ))}
            </select>
            <br />
            <br />
            <button>장바구니</button>&nbsp;&nbsp;
            <button>바로구매</button>
          </div>
        </section>

        <section className='proddetail'>
          <h2>상세페이지</h2>
          <p>필수 표기정보</p>
          <table>
            <tr>
              <th>품명</th>
            </tr>
            <tr>
              <td></td>
            </tr>
          </table>
        </section>
        <div className='reviews'>후기목록</div>
      </div>
    </OrderComp>
  );
}
