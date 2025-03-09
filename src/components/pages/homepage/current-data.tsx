function Currentdata({
  weather,
}: {
  weather: {
    location: string; // Ajouter le champ location
    temperature: number;
    windspeed: number;
  };
}) {
  return (
    <div className="current-data ">
      <div className="">
        <h1> {weather.location}</h1> {/* Afficher la ville */}
        <h1>{weather.temperature}°</h1>
      </div>
    </div>
  );
}

export default Currentdata;
