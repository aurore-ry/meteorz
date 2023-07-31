import React, { FC, useMemo } from "react";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { fr } from "date-fns/locale";

import { WeatherDTO } from "../../types";

//import backgrounds
import clear from "../../../public/img/clearly.jpeg";
import mist from "../../../public/img/misty.png";
import overcast from "../../../public/img/overcast.jpeg";
import sunny from "../../../public/img/sunny.jpg";
import thunder from "../../../public/img/thunder.png";
import rainy from "../../../public/img/rainymoutain.jpg";
import "./index.css";
//import icons
import Sunrise from "../../icons/sunrise";
import Sunset from "../../icons/sunset";
import Moonrise from "../../icons/moonrise";
import Moonphase from "../../icons/moonphase";

setDefaultOptions({
  locale: fr,
});

interface WeatherCardProps {
  weatherData: WeatherDTO;
}

const backgrounds: Record<WeatherDTO["current"]["condition"]["text"], string> =
  {
    Blizzard: overcast,
    Cloudy: overcast,
    Clear: clear,
    Fog: mist,
    "Light rain": rainy,
    "Light rain shower": rainy,
    Mist: mist,
    "Moderate or heavy rain with thunder": thunder,
    Overcast: overcast,
    "Partly cloudy": overcast,
    Rain: rainy,
    Sunny: sunny,
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
          <div className="card_content header">
            <div className="column_header">
              <p>{weatherData.location.name}</p>
              <p>{weatherData.current.condition.text}</p>
            </div>
            <img
              id="weather_condition_icon"
              src={weatherData.current.condition.icon}
              alt="Current description of weather"
            />
          </div>
          <div className="card_content row">
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
            <Sunrise />
            <p>{weatherData.forecast.forecastday[0].astro.sunrise}</p>
            <Sunset />
            <p>{weatherData.forecast.forecastday[0].astro.sunset} </p>
            <Moonrise />
            <p>{weatherData.forecast.forecastday[0].astro.moonrise}</p>
            <Moonphase />
            <p>{weatherData.forecast.forecastday[0].astro.moon_phase}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
