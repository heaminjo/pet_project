import styled from "styled-components";

const ToggleComp = styled.div`
  .toggle_switch {
    background-color: #ccc;
    position: relative;
    width: 70px;
    height: 30px;
    margin: 0 auto;
    border-radius: 50px;
    background-color: ${(props) => (props.isOn ? "#1FFF00" : "red")};
    .toggle_btn {
      background-color: #000;
      width: 27px;
      height: 28px;
      border-radius: 100%;
      position: absolute;
      cursor: pointer;
      background-color: #fff;
      border: 1px solid #ccc;
      bottom: 1;
    }
    #on {
      right: 0;
    }
    #off {
      left: 0;
    }
  }
`;
export default function Toggle({ isOn, clickEvt }) {
  return (
    <ToggleComp isOn={isOn}>
      <div className="toggle_switch">
        <div
          className="toggle_btn"
          onClick={clickEvt}
          id={isOn ? "on" : "off"}
        ></div>
      </div>
    </ToggleComp>
  );
}
