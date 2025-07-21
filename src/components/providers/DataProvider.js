import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState
} from 'react';

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    species: '',
    gender: '',
    type: ''
  });
  const [apiURL, setApiURL] = useState(API_BASE_URL);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    try {
      const response = await axios.get(url);
      setCharacters(response.data.results || []);
      setInfo(response.data.info || {});
      setApiURL(url);
    } catch (error) {
      console.error('Fetch error:', error);
      setIsError(true);
      setCharacters([]);
      setInfo({});
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    const url = new URL(API_BASE_URL);

    if (filters.name) url.searchParams.set('name', filters.name);

    if (filters.status) url.searchParams.set('status', filters.status);

    if (filters.species) url.searchParams.set('species', filters.species);

    if (filters.gender) url.searchParams.set('gender', filters.gender);

    if (filters.type) url.searchParams.set('type', filters.type);
    url.searchParams.set('page', activePage + 1);

    fetchData(url.toString());
  }, [activePage, filters, fetchData]);

  const value = useMemo(
    () => ({
      activePage,
      setActivePage,
      characters,
      isFetching,
      isError,
      info,
      filters,
      setFilters,
      apiURL,
      setApiURL,
      fetchData
    }),
    [
      activePage,
      characters,
      isFetching,
      isError,
      info,
      filters,
      apiURL,
      fetchData
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
};
