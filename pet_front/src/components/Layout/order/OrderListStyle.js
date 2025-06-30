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

  .orderlist-container {
    width: 100%;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    border-radius: 6px;
    color: #444;
  }

  h2 {
    font-size: 1.6rem;
    color: #444;
    margin-bottom: 10px;
    padding: 10px 20px;
    display: inline-block;
  }

  .orderlist {
    width: 900px;
    margin-bottom: 30px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .ordertitle {
    font-weight: bold;
    font-size: 1.1rem;
    background-color: rgb(248, 246, 246);
    padding: 12px 16px;
    margin: 0 auto;
    border: 1px solid #ddd;
    border-bottom: none;

    button {
      width: 200px;
      padding: 8px 12px;
      background-color: #ffaaaa;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-left: 20px;
    }

    button:hover {
      background-color: rgb(255, 145, 145);
    }
  }

  .orderstate {
    width: inherit;
    height: 40px;
    margin-left: 30px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: start;
    align-items: center;
    font-size: 20px;
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
    margin-left: 50px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.3s ease; /* 부드러운 애니메이션 */
    box-shadow: 1px 1px 3px rgb(150, 150, 150);
  }

  .prodimg:hover {
    transform: scale(1.05);
  }

  .proddesc {
    flex: 1;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #444;
    font-size: 1.2rem;

    b {
      font-weight: bold;
      font-size: 0.95rem;
      color: #444;
    }
  }

  .btn {
    display: flex;
    flex-direction: column;
    margin-right: 50px;
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
