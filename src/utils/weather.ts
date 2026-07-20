export const weatherIcon = (code: number, isDay = true) => {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 2) return isDay ? "🌤️" : "☁️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌦️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 86) return "🌨️";
  return "⛈️";
};

export const weatherLabel = (code: number) => {
  if (code === 0) return "Ciel dégagé";
  if (code <= 2) return "Peu nuageux";
  if (code === 3) return "Couvert";
  if (code <= 48) return "Brumeux";
  if (code <= 67) return "Averses";
  if (code <= 77) return "Neige";
  if (code <= 82) return "Pluie";
  if (code <= 86) return "Averses de neige";
  return "Orageux";
};
