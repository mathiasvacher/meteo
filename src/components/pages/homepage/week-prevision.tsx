function Weekprevision({ daily }: { daily: { time: string[]; temperature_max: number[]; temperature_min: number[]; weather_code: number[] } }) {
  return (
    <div className="box week-prevision p-3">
      <h2 className="">Prévisions de la Semaine</h2>
      <div className="">
        <div className="row row-week">
          {daily.time.map((date, index) => (
            <div key={index} className="week text-center">
              <p>
                <strong>
                  {/* Affichage du jour de la semaine */}
                  {new Date(date).toLocaleDateString('fr-FR', { weekday: 'long' })}
                </strong>
              </p>
              {/* <img
                src={`/icons/${daily.weather_code[index]}.png`} 
                alt="Météo"
                width={40}
                height={40}
              /> */}
              <p>
                <strong>{daily.temperature_max[index]}°C</strong> / {daily.temperature_min[index]}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weekprevision;
