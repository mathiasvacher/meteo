export interface WeatherData {
  temperature: number;
  windspeed: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  location: string;
  hourly: { time: string[]; temperature: number[]; weather_code: number[] };
  daily: { time: string[]; temperature_max: number[]; temperature_min: number[]; weather_code: number[] };
}

export const fetchWeather = async (lat: number, lon: number, location: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FParis`,
  );

  if (!response.ok) throw new Error("Problème lors du chargement des données météo");
  const data = await response.json();
  if (!data.current || !data.hourly || !data.daily) throw new Error("Les données météo sont incomplètes.");

  const round = (temperature: number) => Math.round(temperature);
  return {
    location,
    temperature: round(data.current.temperature_2m || 0),
    windspeed: round(data.current.wind_speed_10m || 0),
    apparentTemperature: round(data.current.apparent_temperature || 0),
    humidity: data.current.relative_humidity_2m || 0,
    precipitation: data.current.precipitation || 0,
    weatherCode: data.current.weather_code || 0,
    isDay: Boolean(data.current.is_day),
    hourly: {
      time: data.hourly.time || [],
      temperature: (data.hourly.temperature_2m || []).map(round),
      weather_code: data.hourly.weather_code || [],
    },
    daily: {
      time: data.daily.time || [],
      temperature_max: (data.daily.temperature_2m_max || []).map(round),
      temperature_min: (data.daily.temperature_2m_min || []).map(round),
      weather_code: data.daily.weather_code || [],
    },
  };
};
