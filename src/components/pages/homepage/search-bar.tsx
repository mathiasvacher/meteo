import { useState } from "react";

type City = { name: string; lat: number; lon: number };

function Searchbar({ onSelect }: { onSelect: (city: string, lat: number, lon: number) => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  const fetchCities = async (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=5&language=fr&format=json`
    );
    if (!response.ok) return;
    const data = await response.json();

    if (data.results) {
      // Remove duplicates using a Set based on "name, country"
      const uniqueCities = new Map<string, City>();
      data.results.forEach((city: { name: string; country: string; latitude: number; longitude: number }) => {
        const cityKey = `${city.name}, ${city.country}`;
        if (!uniqueCities.has(cityKey)) {
          uniqueCities.set(cityKey, {
            name: cityKey,
            lat: city.latitude,
            lon: city.longitude,
          });
        }
      });

      setSuggestions(Array.from(uniqueCities.values()));
    }
  };

  const handleSelect = (city: string, lat: number, lon: number) => {
    setQuery(city);
    setSuggestions([]);
    onSelect(city, lat, lon);
  };

  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchCities(e.target.value);
        }}
        placeholder="Rechercher une ville"
        aria-label="Rechercher une ville"
      />
      {suggestions.length > 0 && (
        <ul className="city-suggestions" role="listbox" aria-label="Villes suggérées">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="city-suggestion"
              onClick={() => handleSelect(city.name, city.lat, city.lon)}
              role="option"
            >
              <span className="location-pin" aria-hidden="true">⌖</span>
              <span>{city.name}</span>
              <span className="select-arrow" aria-hidden="true">›</span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default Searchbar;
