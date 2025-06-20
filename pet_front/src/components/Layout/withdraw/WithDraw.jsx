import WithDrawComp from "./WithDrawStyle";

export default function WithDraw() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <WithDrawComp>
      <div className="container">
        <h2>취소 요청 페이지</h2>
      </div>
    </WithDrawComp>
  );
}
