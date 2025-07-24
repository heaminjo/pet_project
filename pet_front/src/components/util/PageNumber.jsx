import styled from 'styled-components';

export default function PageNumber({ page, setPage, paging }) {
  const PageNumberComp = styled.div`
    .curr_page {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: end;
      height: 40px;
      margin-top: 10px;
      margin-left: -2px;
      position: relative;
      span {
        cursor: pointer;
        font-size: 15px;
        padding: 10px;
        cursor: pointer;
      }
      .current {
        font-weight: bold;
      }
      #last_page {
        position: absolute;
        right: 300px;
        bottom: -10px;
      }
      #first_page {
        position: absolute;
        left: 300px;
        bottom: -10px;
      }
    }
    .page_btn {
      display: flex;
      width: 200px;
      height: 20px;
      gap: 20px;
      justify-content: center;
      margin: 0 auto;
      position: relative;
      padding: 10px 0;
      button {
        width: 40px;
        height: 40px;
        border: none;
        cursor: pointer;
        position: absolute;
        background-color: #fff;
      }
      #first {
        left: 0;
      }
      #prev {
        right: 120px;
      }
      #next {
        left: 120px;
      }
      #last {
        right: 0;
      }
    }
  `;

  return (
    <PageNumberComp>
      <div className='select_page'>
        <ul className='curr_page'>
          {paging.start != 0 && (
            <li>
              <span id='first_page' onClick={() => setPage(0)}>
                1 . . .
              </span>
            </li>
          )}
          {Array.from({ length: paging.end - paging.start }, (_, index) => {
            const pageNumber = paging.start + index;
            return (
              <li onClick={() => setPage(pageNumber)}>
                <span className={page == pageNumber ? 'current' : ''}>{pageNumber + 1}</span>
              </li>
            );
          })}
          {paging.end != paging.totalPages && (
            <li>
              <span id='last_page' onClick={() => setPage(paging.totalPages - 1)}>
                {' '}
                {/* . . . {paging.totalPages} */}
              </span>
            </li>
          )}
        </ul>
        <div className='page_btn'>
          <button disabled={!paging.start != 0} className='move' id='first' onClick={() => setPage(0)}>
            ◀◀
          </button>
          <button disabled={!paging.isPrev} className='move' id='prev' onClick={() => setPage(page - 1)}>
            ◀
          </button>

          <button disabled={!paging.isNext} className='move' id='next' onClick={() => setPage(page + 1)}>
            ▶
          </button>
          <button disabled={!(paging.end != paging.totalPages)} className='move' id='last' onClick={() => setPage(paging.totalPages - 1)}>
            ▶▶
          </button>
        </div>
      </div>
    </PageNumberComp>
  );
}
