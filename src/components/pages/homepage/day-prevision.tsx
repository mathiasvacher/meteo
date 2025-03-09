function Dayprevision({
  hourly,
}: {
  hourly: {
    time: string[];
    temperature: number[];
    weather_code: number[];
  };
}) {
  // Vérifier que les données existent et sont valides avant de les utiliser
  if (
    !hourly ||
    !hourly.time ||
    !hourly.temperature ||
    !hourly.weather_code ||
    hourly.time.length === 0
  ) {
    return <p>Aucune prévision horaire disponible.</p>;
  }

  // Fonction pour diviser les horaires en tranches de 2 heures
  const groupByTwoHours = (times: string[], temperatures: number[], weatherCodes: number[]) => {
    const result = [];
    const currentTime = new Date(); // Heure actuelle
    const currentHour = currentTime.getHours(); // L'heure actuelle en heures
    const currentMinute = currentTime.getMinutes(); // Les minutes actuelles

    // Calculer l'heure du début de la première tranche de 2h
    let nextStartHour = currentHour;
    if (currentMinute > 0) {
      // Si les minutes sont après 0 (par exemple 18:15), on passe à l'heure suivante pour la tranche de 2h
      nextStartHour += 1;
    }

    // Filtrer les horaires pour n'afficher que ceux après l'heure actuelle
    for (let i = 0; i < times.length; i++) {
      const time = new Date(times[i]);
      const hour = time.getHours();

      // Ajouter l'heure suivante à la tranche de 2h
      if (hour >= nextStartHour && result.length < 6) {
        result.push({
          timeRange: `${hour}:00`,  // Afficher uniquement l'heure de début de la tranche
          tempRange: `${Math.round(temperatures[i])}°C / ${Math.round(temperatures[i + 1])}°C`,
          weather: weatherCodes[i],
        });
        nextStartHour = hour + 2; // Passer à la prochaine tranche de 2 heures
        i++; // Saute l'élément suivant pour grouper en tranches de 2 heures
      }
    }
    return result;
  };

  // Grouper les données horaires par tranches de 2 heures après l'heure actuelle
  const timeSlots = groupByTwoHours(hourly.time, hourly.temperature, hourly.weather_code);

  // Limiter à un maximum de 6 tranches de 2 heures
  const limitedTimeSlots = timeSlots.slice(0, 6);

  // Remplacer 24:00 par 00:00
  const formatTime = (timeRange: string) => {
    return timeRange.replace("24:00", "00:00");
  };

  return (
    <div className="box day-prevision ">
      <h2 className="">Prévisions horaires</h2>
      <div className="">
        <div className="row row-day">
          {limitedTimeSlots.map((slot, index) => (
            <div key={index} className="col day text-center">
              <p><strong>{formatTime(slot.timeRange)}</strong></p> {/* Affiche l'heure de début */}
              <img
                src={`/icons/${slot.weather}.png`}
                alt="Météo"
                width={40}
                height={40}
              />
              <p>
                <strong>{slot.tempRange}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dayprevision;
