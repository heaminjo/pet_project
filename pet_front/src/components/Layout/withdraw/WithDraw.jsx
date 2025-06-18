import WithDrawComp from './WithDrawStyle';

export default function WithDraw() {
  return (
    <WithDrawComp>
      <div className='container'>
        <h2>취소 요청 페이지</h2>

        <h2>취소사유를 선택해주세요</h2>
        <div class='option-box'>
          <label class='radio-label'>
            <input type='radio' name='reason' checked />
            상품이 마음에 들지 않음 (단순변심)
            <div class='subtext'>상세 사유 입력</div>
          </label>
          <hr />
          <label class='radio-label'>
            <input type='radio' name='reason' />
            다른 상품 추가 후 재주문 예정
          </label>
        </div>

        <div class='button-group'>
          <button class='prev-btn'>이전 단계</button>
          <button class='next-btn'>다음 단계</button>
        </div>
      </div>

      <br />
      <br />

      <div class='container'>
        <h2>환불 정보를 확인해주세요!</h2>
        <div class='refund-info'>
          <div class='refund-row'>
            <span>상품금액</span>
            <span>17,020 원</span>
          </div>
          <div class='refund-row'>
            <span>배송비</span>
            <span>0 원</span>
          </div>
          <div class='refund-row'>
            <span>반품비</span>
            <span>0 원</span>
          </div>
          <div class='refund-row bold'>
            <span>환불 예상금액</span>
            <span class='highlight'>17,020 원</span>
          </div>
          <div class='refund-row'>
            <span>환불 수단</span>
            <span>쿠팡와우카드(KB국민) / 일시불</span>
          </div>
        </div>
        <div class='button-group'>
          <button class='prev-btn'>이전 단계</button>
          <button class='next-btn'>신청하기</button>
        </div>
      </div>
    </WithDrawComp>
  );
}
