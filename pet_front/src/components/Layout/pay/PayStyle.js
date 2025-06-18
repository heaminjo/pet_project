import styled from 'styled-components';

const PayComp = styled.div`
  .container {
    width: 900px;
    margin: 0 auto;
    font-family: 'Arial', sans-serif;
    color: #222;
  }

  h2 {
    font-size: 1.5rem;
    color: #222;
    margin-bottom: 10px;
  }

  .title {
    font-weight: bold;
    font-size: 1.3rem;
    margin: 10px 20px;
    display: flex;
    align-items: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    font-size: 0.95rem;
  }

  th {
    width: 150px;
    background-color: #f6e96c;
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  td {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 10px;
  }

  .badge {
    color: red;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .goodslist {
    margin: 5px 0;
    padding: 8px 12px;
    background-color: #fafafa;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  button {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .pay {
    width: 300px;
    height: 100px;
    margin: 50px 20px 0 0;
    font-size: 1.2rem;
    background-color: #f6e96c;
    color: #000;
    font-weight: bold;
    border: 1px solid #ccc;
  }

  .cancel {
    width: 300px;
    height: 100px;
    font-size: 1.2rem;
    background-color: #fff;
    border: 1px solid #ccc;
  }

  input[type='radio'] {
    margin-right: 6px;
  }

  hr {
    border: 0;
    height: 1px;
    background-color: #ddd;
    margin: 10px 0 20px 0;
  }
`;

export default PayComp;
