import { WeatherData } from "../../../services/weather-service";

function Miscellaneous({ weather }: { weather: WeatherData }) {
  
    return (
      <section className="details-grid">
        <article className="tile detail-tile"><span className="eyebrow">Humidité</span><strong>💧 {weather.humidity}%</strong><p>Dans l’air actuellement</p></article>
        <article className="tile detail-tile"><span className="eyebrow">Précipitations</span><strong>☔ {weather.precipitation} mm</strong><p>Relevé en cours</p></article>
      </section>
    );
}
  
export default Miscellaneous;
