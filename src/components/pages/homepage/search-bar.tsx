import { useState, useEffect } from "react";
import loupeWhite from '../../../assets/img/icons/loupe_white.svg';
import loupeBlack from '../../../assets/img/icons/loupe_black.svg';

function Searchbar({ onSelect }: { onSelect: (city: string, lat: number, lon: number) => void }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; lat: number; lon: number }[]>([]);
  const [loupeIcon, setLoupeIcon] = useState<string>(loupeWhite); // Default to white loupe icon

  // Effect to detect the theme and update the loupe icon whenever the theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = document.body.classList.contains("light-theme") ? "light-theme" : "dark-theme";
      if (currentTheme === "light-theme") {
        setLoupeIcon(loupeBlack); // Light theme -> black loupe
      } else {
        setLoupeIcon(loupeWhite); // Dark theme -> white loupe
      }
    };

    // Call it immediately in case the theme is already set
    handleThemeChange();

    // Watch for changes in the theme (add or remove theme classes)
    document.body.addEventListener('classChange', handleThemeChange);

    return () => {
      // Clean up the event listener when the component unmounts
      document.body.removeEventListener('classChange', handleThemeChange);
    };
  }, []);

  const fetchCities = async (input: string) => {
    if (input.length < 3) return; // Avoid unnecessary requests

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=5&language=fr&format=json`
    );
    const data = await response.json();

    if (data.results) {
      // Remove duplicates using a Set based on "name, country"
      const uniqueCities = new Map();
      data.results.forEach((city: any) => {
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
    <div className="box search-bar position-relative">
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          fetchCities(e.target.value);
        }}
        placeholder="Cherchez votre ville"
      />
      {suggestions.length > 0 && (
        <ul className="list-group">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(city.name, city.lat, city.lon)}
              style={{ cursor: "pointer" }}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}

      <div className="loupe">
        <img src={loupeIcon} alt="Loupe" className='Loupe'/>
      </div>
    </div>
  );
}

export default Searchbar;
