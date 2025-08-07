import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [filterc, setFilterc] = useState([]);
  const [countryValue, setCountryValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  useEffect(() => {
    if (filterc.length === 1) {
      const countryName = filterc[0].name.common;
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        .then((res) => {
          setSelectedCountry(res.data[0]);
        });
    } else {
      setSelectedCountry(null); // clear if not one match
    }
  }, [filterc]);

  const handleSearch = (e) => {
    const searchFor = e.target.value.toLowerCase();
    setCountryValue(searchFor);
    const sc = countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchFor)
    );
    setFilterc(sc);
  };

  if (!countries.length) return <p>Loading...</p>;

  return (
    <>
      <div>
        <p>Find countries</p>
        <input
          type="text"
          value={countryValue}
          onChange={handleSearch}
        />
      </div>

      <div>
        {filterc.length > 10 ? (
          <p>Too many countries</p>
        ) : (
          filterc.map((e) => (
            <p key={e.cca3}>{e.name.common}</p>
          ))
        )}
      </div>

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <img
            src={selectedCountry.flags.svg}
            alt={`Flag of ${selectedCountry.name.common}`}
            width={100}
          />
        </div>
      )}
    </>
  );
}

export default App;
