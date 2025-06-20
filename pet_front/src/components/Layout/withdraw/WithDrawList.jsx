import styled from 'styled-components';

export default function WithDrawList() {
  // 테스트용 데이터
  const historyList = [
    {
      requestDate: '2025/5/17',
      orderDate: '2025/5/11',
      orderNumber: '2100112573207',
      productName: '제품이름',
      productDetail: '혼합색상, 1개',
      quantity: 1,
      price: 20140,
      status: '반품완료',
      refundExpected: '5/19(월) 이내 카드사 환불 완료 예정',
    },
    {
      requestDate: '2025/5/16',
      orderDate: '2025/5/16',
      orderNumber: '2100113645285',
      productName: '제품이름2 ',
      productDetail: '블루블랙, 2개',
      quantity: 1,
      price: 9500,
      status: '취소완료',
      refundExpected: '5/16(금) 이내 카드사 환불 완료 예정',
    },
  ];
  return (
    <WithDrawListComp>
      <div className='container'>
        <h2>취소 내역</h2>
        <h2>취소/반품/교환/환불내역</h2>
        <div className='tab'>
          <div className='active'>취소/반품/교환</div>
          <div>무통장환불</div>
        </div>
        <p className='desc'>취소/반품/교환 신청한 내역을 확인할 수 있습니다.</p>

        {historyList?.map((item, idx) => (
          <div className='history-card' key={idx}>
            <div className='top'>
              <div>접수일: {item.requestDate}</div>
              <div>주문일: {item.orderDate}</div>
              <div>주문번호: {item.orderNumber}</div>
            </div>
            <div className='middle'>
              <div className='product-name'>{item.productName}</div>
              <div className='product-detail'>{item.productDetail}</div>
            </div>
            <div className='bottom'>
              <div className='price'>
                {item.quantity}개&nbsp;&nbsp;{item.price.toLocaleString()} 원
              </div>
              <div className='status'>
                <div className='status-label'>{item.status}</div>
                <div className='expect'>{item.refundExpected}</div>
                <div className='btns'>
                  {item.status === '반품완료' ? (
                    <>
                      <button>반품상세</button>
                      <button>회수조회</button>
                    </>
                  ) : (
                    <button>취소상세</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WithDrawListComp>
  );
}

const WithDrawListComp = styled.div`
  width: 900px;
  margin: 0 auto;
  font-family: 'Arial';
  color: #222;

  h2 {
    font-size: 22px;
    margin: 16px 0;
  }

  .tab {
    display: flex;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .tab > div {
    padding: 10px 20px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-bottom: none;
    background-color: #f9f9f9;
  }

  .tab > .active {
    background-color: #fff;
    font-weight: bold;
    border-bottom: 2px solid #fff;
  }

  .desc {
    font-size: 13px;
    color: #777;
    margin-bottom: 16px;
  }

  .history-card {
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-bottom: 16px;
    padding: 12px;
    background-color: #fff;
  }

  .top,
  .middle,
  .bottom {
    margin-bottom: 8px;
  }

  .top {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #555;
  }

  .product-name {
    font-weight: bold;
    font-size: 15px;
  }

  .product-detail {
    font-size: 13px;
    color: #888;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    font-size: 15px;
    font-weight: bold;
  }

  .status {
    text-align: right;
  }

  .status-label {
    font-weight: bold;
    color: #0d6efd;
    margin-bottom: 4px;
  }

  .expect {
    font-size: 13px;
    color: #555;
  }

  .btns {
    margin-top: 4px;
  }

  .btns button {
    margin-left: 4px;
    padding: 4px 10px;
    font-size: 13px;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    border-radius: 4px;
  }

  .btns button:hover {
    background-color: #f0f0f0;
  }
`;
