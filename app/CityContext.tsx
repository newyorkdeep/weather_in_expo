import React, { createContext, useContext, useState } from 'react';

const cityList = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Sydney',
  'Berlin',
  'Moscow',
  'Beijing',
  'Cairo',
  'Rio de Janeiro',
];

const CityContext = createContext({
  city: cityList[0],
  setCity: (city: string) => {},
  cityList,
});

export const useCity = () => useContext(CityContext);

export const CityProvider = ({ children }: { children: React.ReactNode }) => {
  const [city, setCity] = useState(cityList[0]);
  return (
    <CityContext.Provider value={{ city, setCity, cityList }}>
      {children}
    </CityContext.Provider>
  );
};
