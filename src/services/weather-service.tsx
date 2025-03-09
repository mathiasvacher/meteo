export interface WeatherData {
    temperature: number;
    windspeed: number;
    location: string; // Ajout du nom de la ville
    hourly: {
        time: string[];
        temperature: number[];
        weather_code: number[];
    };
    daily: {
        time: string[];
        temperature_max: number[];
        temperature_min: number[];
        weather_code: number[];
    };
}

export const fetchWeather = async (lat: number, lon: number, location: string): Promise<WeatherData> => {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Paris`
    );

    if (!response.ok) throw new Error("Problème lors du chargement des données météo");

    const data = await response.json();
    console.log(data.current_weather); // Vérifiez que l'humidité est bien dans current_weather


    if (!data.current_weather || !data.hourly || !data.daily) {
        throw new Error("Les données météo sont incomplètes.");
    }

    // Fonction pour arrondir les températures à l'entier le plus proche
    const roundTemperature = (temp: number) => Math.round(temp); // Arrondi à l'entier le plus proche

    // Mise à jour de l'extraction des données en fonction de la structure observée
    return {
        location: location,
        temperature: roundTemperature(data.current_weather.temperature || 0), 
        windspeed: roundTemperature(data.current_weather.windspeed || 0), 
        hourly: {
            time: data.hourly.time || [],
            temperature: data.hourly.temperature_2m.map(roundTemperature) || [],
            weather_code: data.hourly.weathercode || [],
        },
        daily: {
            time: data.daily.time || [],
            temperature_max: data.daily.temperature_2m_max.map(roundTemperature) || [],
            temperature_min: data.daily.temperature_2m_min.map(roundTemperature) || [],
            weather_code: data.daily.weathercode || [],
        },
    };
};

