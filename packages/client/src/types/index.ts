export type Hotel = {
  _id: string;
  chain_name: string;
  hotel_name: string;
  city: string;
  country: string;
};

export type Country = {
  country: string;
  countryisocode: string;
};

export type City = {
  name: string;
};

export type AccommodationData = {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
};
