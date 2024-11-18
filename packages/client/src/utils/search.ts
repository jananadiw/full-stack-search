import { AccommodationData } from '../types/'

export const filterSearchResults = (data: AccommodationData, searchTerm: string) => {
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
