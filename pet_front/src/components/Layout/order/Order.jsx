import { useState, useEffect } from "react";
import OrderComp from "./OrderStyle.js";
import styled from "styled-components";

import { useLocation, useNavigate } from "react-router-dom";
import OrderTab from "./OrderTab.jsx";
import ReviewList from "./review/ReviewList.jsx";
import GoodsApi from "../../../api/GoodsApi.js";
import Modal from "../../../modal/Modal.jsx";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { goods } = location.state || {};
  const prodImage = process.env.PUBLIC_URL + "/images/avatar.png";
  const [buyQuantity, setBuyQuantity] = useState(1);

  const EMPTY_HEART = "🤍";
  const FULL_HEART = "❤️";
  const [heart, setHeart] = useState("🤍");
  const [isFavorite, setIsFavorite] = useState(false);

  const [stars, setStars] = useState(); // ⭐

  const [activeTab, setActiveTab] = useState("상품상세");

  const [showModal, setShowModal] = useState(false); // Y/N

  const data = [
    { label: "품명", value: goods.goodsName },
    { label: "크기 및 중량", value: goods.description },
    { label: "제품 구성", value: "컨텐츠 참조" },
  ];

  // 결제
  const pay = async (goods) => {
    if (sessionStorage.getItem("loginName") != null) {
      const goodsWithQuantity = { ...goods, quantity: buyQuantity };
      navigate("/user/mypage/pay", { state: { goods: goodsWithQuantity } });
      // => <Cart /> <Order /> 공통으로 쓰는 로직이므로, 해당 줄은 변경하지 않기로 한다.
      //     ㄴ> ( navigate('/user/mypage/pay', { state: { goods: goodsWithQuantity } }); )
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login", { state: { nextUrl: "/user/mypage/pay" } });
    }
    console.log(`결제페이지 이동 성공, 상품ID:  => ${goods.goodsId}`);
  };

  // 모달 핸들러 함수
  const goToCart = () => {
    setShowModal(false);
    navigate("/user/mypage/cart/list");
  };

  // 장바구니 담기
  const addToCart = async (goods, buyQuantity) => {
    try {
      if (sessionStorage.getItem("loginName") != null) {
        const response = await GoodsApi.addToCart(goods, buyQuantity);
        alert("장바구니에 " + goods.goodsName + "이(가) 1개 담겼습니다.");
        console.log(`장바구니 담기 성공, 상품ID:  => ${response}`);
        // navigate("/user/mypage/cart/list");
        setShowModal(true); // 모달 표시
      } else {
        alert("로그인이 필요한 서비스입니다.");
      }
    } catch (err) {
      alert("장바구니 담기에 실패했습니다.");
    }
  };

  // 별점 (배열)
  const renderStars = (rating) => {
    // return '⭐'.repeat(Math.floor(rating)); // 반올림이나 소수점 무시
    const stars = [];
    const fullStars = Math.floor(rating); // 채운 별 수
    const emptyStars = 5 - fullStars; // 빈 별 수
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} color="gold" size={30} />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="lightgray" size={30} />);
    }
    return stars;
  };

  // 찜 (적용)
  const addFavorite = () => {
    console.log(`찜한 상품의 goods Id => ${goods.goodsId}`);
    GoodsApi.favorite(goods.goodsId)
      .then((response) => {
        setIsFavorite((prev) => !prev);
      })
      .catch((err) => {
        // alert(`에러발생 => ${err}`);
      });
  };

  // 찜 (불러오기)
  const favoriteInfo = () => {
    GoodsApi.favoriteInfo(goods.goodsId)
      .then((response) => {
        setIsFavorite(response === "TRUE");
        console.log(`찜 상태 가져오기 => ${response}`);
      })
      .catch((err) => {
        // alert(`에러발생 => ${err}`);
      });
  };

  // 구매수량 제한
  const setQuantity = (number) => {
    if (number > goods.quantity) {
      setBuyQuantity(goods.quantity);
    } else if (number < 1) {
      setBuyQuantity(1);
    } else {
      setBuyQuantity(number);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(
      `상품정보 확인: ${goods.goodsId}, ${goods.goodsName}, ${goods.goodsState}, ${goods.description}, ${goods.price}, 수량: ${goods.quantity}`
    );
    if (goods) {
      renderStars(goods.rating || 0);
    }
  }, [goods]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (goods) {
      favoriteInfo(); // 최초 로딩 시 찜 상태 불러오기
    }
  }, [goods]);

  return (
    <OrderComp>
      <div className="container">
        <section className="product">
          <div className="left">
            <img
              src={`${goods.imageFile}`}
              alt={goods.goodsName}
              className="prodimg"
            />
          </div>
          <div className="right">
            <div className="prodname" onClick={() => addFavorite()}>
              {goods.goodsName}&nbsp;&nbsp;
              <FaHeart
                color={isFavorite ? "red" : "white"}
                size={24}
                style={{ stroke: "gray", strokeWidth: 24 }}
              />
            </div>
            <p className="rating" style={{ color: "red", fontSize: "12px" }}>
              {renderStars(goods.rating)}&nbsp;&nbsp;
              {goods.reviewNum === "undefined"
                ? "1 개 상품평"
                : "( " + goods.reviewNum + " 개 상품평 )"}
            </p>
            <div className="prodprice">
              {goods.price} 원<span className="prodprice2"></span>
            </div>
            <hr />
            <div>
              <b>
                판매자 &nbsp;&nbsp;{" "}
                <img src={prodImage} alt="상품이미지" className="sellerimg" />{" "}
                &nbsp;&nbsp; 몽냥마켓
              </b>
            </div>
            <div>
              <b>
                <label>구매가능 수량(재고)</label>
                &nbsp;&nbsp;{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {goods.quantity}
                </span>
              </b>
            </div>
            <div>
              <b>
                <label>구매 수량</label>&nbsp;&nbsp; &nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  style={{ width: "80px", height: "20px" }}
                  type="number"
                  min={1}
                  max={goods.quantity}
                  value={buyQuantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </b>
            </div>
            {showModal && (
              <ModalContainer>
                <Modal
                  content={
                    <>
                      상품이 장바구니에 정상적으로 담겼습니다.
                      <br />
                      장바구니로 이동하시겠습니까?
                    </>
                  }
                  clickEvt={goToCart}
                  setModal={setShowModal}
                />
              </ModalContainer>
            )}
            <br />
            <hr />
            <br />
            <button
              className="btn1"
              onClick={() => addToCart(goods, buyQuantity)}
            >
              장바구니
            </button>
            &nbsp;&nbsp;
            <button className="btn2" onClick={() => pay(goods)}>
              바로구매
            </button>
          </div>
        </section>
        <hr />
        <div className="product-container">
          <OrderTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            reviewNum={goods.reviewNum}
          />
          {/* 상품상세 탭일 때 */}
          {activeTab === "상품상세" && (
            <>
              <table className="product-table">
                <tbody>
                  {data.map((item, idx) => (
                    <tr key={idx}>
                      <th className="product-th">{item.label}</th>
                      <td className="product-td">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="product-more">필수 표기정보 더보기 ▼</div>
            </>
          )}

          {/* 리뷰 탭일 때 */}
          {activeTab === `상품평 (${goods.reviewNum})` && (
            <ReviewList
              stars={stars}
              goodsId={goods.goodsId}
              reviewNum={goods.reviewNum}
              imgUrl=""
            />
          )}
        </div>
      </div>
      {showModal && (
        <ModalContainer>
          <Modal
            content={
              <>
                {goods.goodsName} 상품이 장바구니에 추가되었습니다.
                <br />
                장바구니로 이동하시겠습니까?
              </>
            }
            clickEvt={goToCart}
            setModal={setShowModal}
          />
        </ModalContainer>
      )}
    </OrderComp>
  );
}

const ModalContainer = styled.div`
  position: fixed;
`;
