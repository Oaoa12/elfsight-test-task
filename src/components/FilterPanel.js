import styled from 'styled-components';
import { useData } from './providers';
import { useState } from 'react';

export function FilterPanel() {
  const { setActivePage, fetchData } = useData();
  const [localFilters, setLocalFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
    type: ''
  });
  const [hoveredSelect, setHoveredSelect] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilter = (name) => {
    setLocalFilters((prev) => ({ ...prev, [name]: '' }));
  };

  const handleApply = () => {
    const url = new URL('https://rickandmortyapi.com/api/character/');
    url.searchParams.set('page', '1');

    if (localFilters.name) url.searchParams.set('name', localFilters.name);

    if (localFilters.status)
      url.searchParams.set('status', localFilters.status);

    if (localFilters.species)
      url.searchParams.set('species', localFilters.species);

    if (localFilters.gender)
      url.searchParams.set('gender', localFilters.gender);

    if (localFilters.type) url.searchParams.set('type', localFilters.type);

    setActivePage(0);
    fetchData(url.toString());
  };

  const handleReset = () => {
    setLocalFilters({
      name: '',
      status: '',
      species: '',
      gender: '',
      type: ''
    });
    setActivePage(0);
    fetchData('https://rickandmortyapi.com/api/character/?page=1');
  };

  return (
    <FilterContainer>
      <FiltersGrid>
        <FilterGroup>
          <SelectWrapper
            onMouseEnter={() => setHoveredSelect('status')}
            onMouseLeave={() => setHoveredSelect(null)}
          >
            <StyledSelect
              name="status"
              value={localFilters.status}
              onChange={handleFilterChange}
              className={localFilters.status === '' ? 'placeholder' : ''}
            >
              <option value="" disabled hidden>
                Status
              </option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </StyledSelect>
            {localFilters.status ? (
              <ClearIcon onClick={() => handleResetFilter('status')}>
                ✕
              </ClearIcon>
            ) : (
              <DropdownIcon>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </DropdownIcon>
            )}
          </SelectWrapper>
        </FilterGroup>

        <FilterGroup>
          <SelectWrapper
            onMouseEnter={() => setHoveredSelect('gender')}
            onMouseLeave={() => setHoveredSelect(null)}
          >
            <StyledSelect
              name="gender"
              value={localFilters.gender}
              onChange={handleFilterChange}
              className={localFilters.gender === '' ? 'placeholder' : ''}
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </StyledSelect>
            {localFilters.gender ? (
              <ClearIcon onClick={() => handleResetFilter('gender')}>
                ✕
              </ClearIcon>
            ) : (
              <DropdownIcon>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </DropdownIcon>
            )}
          </SelectWrapper>
        </FilterGroup>

        <FilterGroup>
          <SelectWrapper
            onMouseEnter={() => setHoveredSelect('species')}
            onMouseLeave={() => setHoveredSelect(null)}
          >
            <StyledSelect
              name="species"
              value={localFilters.species}
              onChange={handleFilterChange}
              className={localFilters.species === '' ? 'placeholder' : ''}
            >
              <option value="" disabled hidden>
                Species
              </option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="unknown">Unknown</option>
            </StyledSelect>
            {localFilters.species ? (
              <ClearIcon onClick={() => handleResetFilter('species')}>
                ✕
              </ClearIcon>
            ) : (
              <DropdownIcon>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </DropdownIcon>
            )}
          </SelectWrapper>
        </FilterGroup>

        <FilterGroup>
          <FilterInput
            type="text"
            name="name"
            value={localFilters.name}
            onChange={handleFilterChange}
            placeholder="Name"
          />
        </FilterGroup>

        <FilterGroup>
          <FilterInput
            type="text"
            name="type"
            value={localFilters.type}
            onChange={handleFilterChange}
            placeholder="Type"
          />
        </FilterGroup>

        <ButtonGroup>
          <ApplyButton onClick={handleApply}>Apply</ApplyButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </ButtonGroup>
      </FiltersGrid>
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  flex: 1;
  max-width: 800px;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  align-items: flex-end;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
`;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  padding: 8px 30px 8px 12px;
  border: 1px solid #83bf46;
  border-radius: 5px;
  background: #1a2b44;
  color: #fff;
  font-size: 14px;
  width: 100%;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s;

  &.placeholder {
    color: #aaa;
  }

  option {
    color: #fff;
    background: #1a2b44;
  }

  option[value=''][disabled] {
    display: none;
  }

  &:hover {
    border-color: #6a9e38;
  }
`;

const DropdownIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClearIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 300;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #83bf46;
  border-radius: 5px;
  background: #1a2b44;
  color: #fff;
  font-size: 14px;
  width: 100%;
  transition: all 0.2s;

  &::placeholder {
    color: #aaa;
  }

  &:hover {
    border-color: #6a9e38;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  grid-column: 3;
  justify-content: flex-end;
  margin-top: 5px;
  margin-right: 50px;

  @media (max-width: 1024px) {
    grid-column: 2;
  }

  @media (max-width: 600px) {
    grid-column: 1;
    justify-content: flex-start;
  }
`;

const ApplyButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #83bf46;
  border-radius: 5px;
  color: #83bf46;
  cursor: pointer;
  min-width: 80px;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: #83bf46;
    color: white;
  }
`;

const ResetButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #ff6b6b;
  border-radius: 5px;
  color: #ff6b6b;
  cursor: pointer;
  min-width: 80px;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: #ff6b6b;
    color: white;
  }
`;
