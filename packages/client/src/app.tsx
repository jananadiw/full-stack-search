import { useState, useEffect } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";
import { useNavigate } from 'react-router-dom';
import { Hotel, Country, City, AccommodationData } from './types/'
import SearchInput from './components/searchInput';
import SearchResults from './components/searchResults';
import {filterSearchResults} from './utils/search'


const codeSandboxHost = getCodeSandboxHost(3001)
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'


function App() {
  const [searchResults, setSearchResults] = useState<{
    hotels: Hotel[],
    countries: Country[],
    cities: City[]
  }>({hotels: [], countries: [], cities: []});
  const [accommodationData, setAccommodationData] = useState<AccommodationData | null>(null);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const handleClickHotel = (id: string) => navigate(`hotel/${id}`)
  const handleClickCountry = (country: string) => navigate(`country/${country}`)
  const handleClickCity= (city: string) => navigate(`city/${city}`)

  const handleClear = () => {
    setSearchResults({ hotels: [], countries: [], cities: [] });
    setShowClearBtn(false);
    setSearchTerm('');
  }

  // Fetch all data on mount
  useEffect(() => {
    const fetchAccommodationData = async () => {
      const response = await fetch(`${API_URL}/accommodation-data`);
      const data = await response.json();
      setAccommodationData(data);
    };
    fetchAccommodationData();
  }, []);

  // Filter search results when search term change
  useEffect(() => {
    if (!accommodationData) return;

    if(searchTerm === ''){
      setSearchResults({ hotels: [], countries: [], cities: [] });
      setShowClearBtn(false);
      return;
    }

    const filtered = filterSearchResults(accommodationData, searchTerm);
    setSearchResults(filtered);
    setShowClearBtn(true);
  }, [searchTerm, accommodationData]);

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown">
              <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showClearBtn={showClearBtn}
              handleClear={handleClear}
              />
              <SearchResults
              searchResults={searchResults}
              handleClickHotel={handleClickHotel}
              handleClickCountry={handleClickCountry}
              handleClickCity={handleClickCity}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
