import styled from 'styled-components';

const StatisticsComp = styled.div`
  width: 100%;
  .text_chart {
    display: flex;
    width: 100%;
    table {
      display: flex;
      flex-direction: column;
      width: 100%;
      tr {
        border-bottom: 1px solid #ccc;
        width: 100%;
        height: 30px;
        th {
          width: 170px;
          text-align: start;
        }
      }
    }
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
  .m_statis_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
    gap: 30px;
    .m_container01 {
      display: flex;
      gap: 20px;
      .chart {
        display: flex;
        border: 1px solid #ccc;
        box-shadow: 4px 4px 3px #ccc;
        padding: 50px;
        width: 80%;
        .re_chart {
          width: 100%;
          ul {
            display: flex;
            gap: 10px;
            li {
              display: flex;
              align-items: center;
              gap: 10px;
              span {
                font-weight: bold;
              }
              #t_login {
                background-color: #3d3d3d;
                width: 20px;
                height: 10px;
              }
              #f_login {
                background-color: #ff0000;
                width: 20px;
                height: 10px;
              }
            }
          }
          .gender_chart {
            display: flex;
            flex-direction: column;
            align-items: center;
            ul {
              width: 100%;
              #boy {
                background-color: #5e69ff;
                width: 20px;
                height: 10px;
              }
              #girl {
                background-color: #ff4e4e;
                width: 20px;
                height: 10px;
              }
            }
          }
        }
      }
    }
    .m_container02 {
      width: 100%;
      height: 250px;
      .chart {
        height: 100%;

        border: 1px solid #ccc;
        padding: 30px;
        box-shadow: 3px 3px 3px #ccc;
        .chart_inner {
          display: flex;
          .pic_chart {
            width: 800px;
          }
        }

        h4 {
          padding-bottom: 20px;
        }
      }
    }
  }
`;
export default StatisticsComp;
