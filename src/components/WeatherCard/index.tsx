import React, { FC, useMemo } from "react";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { fr } from "date-fns/locale";

import { WeatherDTO } from "../../types";

import overcast from "../../../public/img/overcast.jpeg";
import sunny from "../../../public/img/sunnysky.png";
import thunder from "../../../public/img/thunder.jpg";
import "./index.css";

setDefaultOptions({
  locale: fr,
});

interface WeatherCardProps {
  weatherData: WeatherDTO;
}

const backgrounds: Record<WeatherDTO["current"]["condition"]["text"], string> =
  {
    Overcast: overcast,
    Sunny: sunny,
    Cloudy: overcast,
    Rain: "../../img/rain.jpg",
    Mist: "../../img/blueskybluesky.jpg",
    Blizzard: overcast,
    "Partly cloudy": overcast,
    "Moderate or heavy rain with thunder": thunder,
  };

console.log("backgrounds: ", backgrounds);

export const WeatherCard: FC<WeatherCardProps> = ({ weatherData }) => {
  console.log(
    "weatherData.current.condition.text!",
    weatherData.current.condition.text
  );

  const backgroundByWeatherCondition = useMemo(
    () => `url(${backgrounds[weatherData.current.condition.text]})`,
    [weatherData]
  );

  return (
    <div className="weatherContainer">
      <div
        className="weatherCardContainer"
        style={{
          backgroundImage: backgroundByWeatherCondition,
          backgroundSize: "cover",
        }}
      >
        <div className="card">
          <div className="header">
            <p>{weatherData.location.name}</p>
            <p>{weatherData.current.condition.text}</p>
            <img
              src={weatherData.current.condition.icon}
              alt="Current description of weather"
            />
          </div>
          <div className="row">
            <div className="temperature">
              <p>
                Temperature:{" "}
                <span id="temp">{weatherData.current.temp_c}°C</span>
              </p>
              <p>
                Temperature min:{" "}
                <span id="temp_min">
                  {weatherData.forecast.forecastday[0].day.mintemp_c}°C
                </span>
              </p>
              <p>
                Temperature max:{" "}
                <span id="temp_max">
                  {weatherData.forecast.forecastday[0].day.maxtemp_c}°C
                </span>
              </p>
            </div>
            <div className="sky">
              <p>Clouds: {weatherData.current.cloud}%</p>
              <p>Wind: {weatherData.current.wind_kph}Km/h</p>
              <p>Humidity: {weatherData.current.humidity}%</p>
            </div>
          </div>
          <div className="sunrise_sunset">
            <p>Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</p>
            <p>Sunset: {weatherData.forecast.forecastday[0].astro.sunset} </p>
            <p>
              Moonrise: {weatherData.forecast.forecastday[0].astro.moonrise}
            </p>
            <p>
              Moon phase: {weatherData.forecast.forecastday[0].astro.moon_phase}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
