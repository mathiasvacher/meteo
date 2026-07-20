function Weekprevision({ daily }: { daily: { time: string[]; temperature_max: number[]; temperature_min: number[]; weather_code: number[] } }) {
  return (
    <section className="tile week-prevision">
      <div className="tile-heading"><div><div className="eyebrow">Les 7 prochains jours</div><h2>Prévisions</h2></div></div>
        <div className="week-list">
          {daily.time.map((date, index) => (
            <div key={index} className="week-row">
              <strong>{index === 0 ? "Aujourd’hui" : new Date(`${date}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'long' })}</strong>
              <span className="week-icon">{weatherIcon(daily.weather_code[index])}</span>
              <span><b>{daily.temperature_max[index]}°</b><em>{daily.temperature_min[index]}°</em></span>
            </div>
          ))}
        </div>
    </section>
  );
}

export default Weekprevision;
import { weatherIcon } from "../../../utils/weather";
