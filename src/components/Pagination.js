import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from './providers';

export function Pagination() {
  const { info, activePage, setActivePage } = useData();
  const [pages, setPages] = useState([]);

  const handlePageClick = (pageIndex) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(pageIndex);
  };

  useEffect(() => {
    if (info?.pages) {
      setPages(Array.from({ length: info.pages }, (_, i) => i));
    }
  }, [info]);

  if (pages.length <= 1) return null;

  return (
    <StyledPagination>
      {activePage > 0 && (
        <>
          <Page onClick={() => handlePageClick(0)}>« First</Page>
          {activePage > 1 && <Ellipsis>...</Ellipsis>}
          <Page onClick={() => handlePageClick(activePage - 1)}>
            {activePage}
          </Page>
        </>
      )}

      <Page active>{activePage + 1}</Page>

      {activePage < pages.length - 1 && (
        <>
          <Page onClick={() => handlePageClick(activePage + 1)}>
            {activePage + 2}
          </Page>
          {activePage < pages.length - 2 && (
            <>
              <Ellipsis>...</Ellipsis>
              <Page onClick={() => handlePageClick(pages.length - 1)}>
                Last »
              </Page>
            </>
          )}
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const Page = styled.span`
  color: ${({ active }) => (active ? '#83bf46' : '#fff')};
  font-size: 18px;
  padding: 5px 10px;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;
  &:hover {
    color: #fff;
  }
`;
