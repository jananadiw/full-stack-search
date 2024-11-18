import React from 'react';
import { Hotel, Country, City } from '../types';
import SearchResultsList from './searchResultsList';

type SearchResultsProps = {
  searchResults: {
    hotels: Hotel[];
    countries: Country[];
    cities: City[];
  };
  handleClickHotel: (id: string) => void;
  handleClickCountry: (country: string) => void;
  handleClickCity: (city: string) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  handleClickHotel,
  handleClickCountry,
  handleClickCity
}) => {
  const hasResults = searchResults.hotels.length > 0 || searchResults.countries.length > 0 || searchResults.cities.length > 0;

  if (!hasResults) return null;

  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      <SearchResultsList
        title="Hotels"
        items={searchResults.hotels}
        renderItem={(hotel) => ({
          key: hotel._id,
          text: hotel.hotel_name,
          onClick: () => handleClickHotel(hotel._id)
        })}
      />
      <SearchResultsList
        title="Countries"
        items={searchResults.countries}
        renderItem={(country) => ({
          key: country.countryisocode,
          text: country.country,
          onClick: () => handleClickCountry(country.country)
        })}
      />
      <SearchResultsList
        title="Cities"
        items={searchResults.cities}
        renderItem={(city) => ({
          key: city.name,
          text: city.name,
          onClick: () => handleClickCity(city.name)
        })}
      />
    </div>
  );
};

export default SearchResults;
