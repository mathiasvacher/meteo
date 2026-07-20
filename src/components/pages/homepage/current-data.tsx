import { weatherIcon, weatherLabel } from "../../../utils/weather";

function Currentdata({
  weather,
}: {
  weather: {
    location: string; // Ajouter le champ location
    temperature: number;
    windspeed: number;
    apparentTemperature: number;
    weatherCode: number;
    isDay: boolean;
  };
}) {
  return (
    <section className="tile current-data">
      <div className="eyebrow">Météo actuelle</div>
      <div className="current-topline">
        <div>
          <h1>{weather.location}</h1>
          <p>{weatherLabel(weather.weatherCode)}</p>
        </div>
        <span className="weather-symbol" aria-hidden="true">{weatherIcon(weather.weatherCode, weather.isDay)}</span>
      </div>
      <div className="temperature-line">
        <strong>{weather.temperature}°</strong>
        <span>Ressenti {weather.apparentTemperature}°</span>
      </div>
      <div className="wind-pill">↗ Vent {weather.windspeed} km/h</div>
    </section>
  );
}

export default Currentdata;
