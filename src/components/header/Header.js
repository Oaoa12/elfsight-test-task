import styled from 'styled-components';
import { Logo } from './Logo';
import { FilterPanel } from '../FilterPanel';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FilterPanel />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;
  padding: 20px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;
