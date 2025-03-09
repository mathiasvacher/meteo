import { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "../services/weather-service.tsx";

import Sidebar from "./../components/side-bar.tsx";
import Searchbar from "./../components/pages/homepage/search-bar.tsx";
import Currentdata from "./../components/pages/homepage/current-data.tsx";
import Dayprevision from "./../components/pages/homepage/day-prevision.tsx";
import Weekprevision from "./../components/pages/homepage/week-prevision.tsx";
import Miscellaneous from "./../components/pages/homepage/miscellaneous.tsx";

function Homepage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [coords, setCoords] = useState({ lat: 45.750000, lon: 4.850000 }); // Paris par défaut
  const [city, setCity] = useState("Lyon"); // Ajouter un état pour la ville

  // Appel API pour récupérer les données météo
  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(coords.lat, coords.lon, city); // Passer la ville
        setWeather(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données météo :", error);
      }
    };
    getWeather();
  }, [coords, city]); // Ajouter 'city' dans les dépendances

  const handleCitySelect = (_city: string, lat: number, lon: number) => {
    setCity(_city); // Met à jour la ville choisie
    setCoords({ lat, lon }); // Met à jour la position pour charger la météo
  };

  return (
    <div className="container-fluid">
      <div className="row row-page">
        <div className="sidebar-page col-3">
          <Sidebar />
        </div>

        <div className="middle-page col-13">
          <Searchbar onSelect={handleCitySelect} />
          {weather ? (
            <>
              <Currentdata
                weather={{
                  location: city,
                  temperature: weather.temperature,
                  windspeed: weather.windspeed,
                }}
              />
              <Dayprevision hourly={weather.hourly} />
              <Miscellaneous />
            </>
          ) : (
            <p>Chargement des données météo...</p>
          )}

        </div>

        <div className="weekprev-page col-8">
          {weather && <Weekprevision daily={weather.daily} />}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
