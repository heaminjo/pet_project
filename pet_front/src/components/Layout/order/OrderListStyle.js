import styled from 'styled-components';
const OrderListComp = styled.div`
  modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
  .container {
    width: 900px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    color: #222;
  }

  h2 {
    font-size: 1.6rem;
    color: #222;
    margin-bottom: 10px;
    padding: 10px 20px;
    display: inline-block;
  }

  .orderlist {
    margin-bottom: 30px;
  }

  .ordertitle {
    font-weight: bold;
    font-size: 1.1rem;
    background-color: rgb(248, 246, 246);
    padding: 12px 16px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-bottom: none;
  }

  .orderlist2 {
    display: flex;
    justify-content: center;
    padding: 0 0 10px 0;
    border-top: none;
    border-radius: 0 0 6px 6px;
  }

  .orderdesc {
    display: flex;
    align-items: center;
    border-radius: 6px 6px 0 0;
    padding: 10px;
    gap: 20px;
    width: 100%;
  }

  .prodimg {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
  }

  .proddesc {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #444;

    b {
      font-weight: bold;
      font-size: 0.95rem;
      color: #111;
    }
  }

  .btn {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 200px;
    justify-content: center;

    button {
      padding: 8px 12px;
      background-color: #ffaaaa;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background-color: rgb(255, 145, 145);
    }
  }
`;

export default OrderListComp;
