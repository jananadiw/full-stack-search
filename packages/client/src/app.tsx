import { useState, useEffect } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";
import { useNavigate } from 'react-router-dom';

type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
}

type Country = {
  country: string;
  countryisocode: string;
}

type City = {
  name: string;
}

type AccommodationData = {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
}


const codeSandboxHost = getCodeSandboxHost(3001)
const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001'

const filterSearchResults = (data: AccommodationData, searchTerm: string) => {
  const term = searchTerm.toLowerCase();

  const filteredHotels = data.hotels.filter(hotel =>
     hotel.hotel_name.toLowerCase().includes(term) ||
     hotel.country.toLowerCase().includes(term) ||
     hotel.city.toLowerCase().includes(term)
   );

  const filteredCountries = data.countries.filter((country) =>
    country.country.toLowerCase().includes(term)
  );

  const filteredCities = data.cities.filter((city) =>
    city.name.toLowerCase().includes(term)
  );

  return {
    hotels: filteredHotels,
    countries: filteredCountries,
    cities: filteredCities
  }
}

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
              <div className="form">
                <i className="fa fa-search"></i>
                <input
                  type="text"
                  className="form-control form-input"
                  placeholder="Search accommodation..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                />
                {showClearBtn && (
                  <span className="left-pan"
                    onClick={()=> {
                      setSearchResults({ hotels: [], countries: [], cities: [] });
                      setShowClearBtn(false);
                      setSearchTerm('');
                    }}>

                    <i className="fa fa-close"></i>
                  </span>
                )}
              </div>
              {(searchResults.hotels.length > 0 || searchResults.countries.length > 0 || searchResults.cities.length > 0) && (
                <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
                  <h2>Hotels</h2>
                  {searchResults.hotels.length ? searchResults.hotels.map((hotel, index) => (
                    <li key={`hotel - ${index}`}>
                      <a onClick={() => handleClickHotel(hotel._id)} className="dropdown-item">
                        <i className="fa fa-building mr-2"></i>
                        {hotel.hotel_name}
                      </a>
                      <hr className="divider" />
                    </li>
                  )) : <p>No hotels matched</p>}
                  <h2>Countries</h2>
                  {searchResults.countries.length ? searchResults.countries.map((country, index) => (
                    <li key={`country - ${index}`}>
                    <a onClick={() => handleClickCountry(country.country)} className="dropdown-item">
                      <i className="fa fa-building mr-2"></i>
                      {country.country}
                    </a>
                    <hr className="divider" />
                  </li>
                  )):
                  <p>No countries matched</p>}
                  <h2>Cities</h2>
                  {searchResults.cities.length ? searchResults.cities.map((city, index) => (
                  <li key={`city - ${index}`}>
                    <a onClick={() => handleClickCity(city.name)} className="dropdown-item">
                      <i className="fa fa-building mr-2"></i>
                      {city.name}
                    </a>
                    <hr className="divider" />
                  </li>
                  )):
                  <p>No cities matched</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
