import React, { FC, useMemo } from "react";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { fr } from "date-fns/locale";

import { WeatherDTO } from "../../types";

//import backgrounds
import clear from "../../../public/img/clear.jpg";
import mist from "../../../public/img/mist.jpg";
import overcast from "../../../public/img/partly_cloudy.jpg";
import sunny from "../../../public/img/clear.jpg";
import thunder from "../../../public/img/thunder.jpg";
import rainy from "../../../public/img/rain.jpg";
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
    "Moderate rain": rainy,
    "Moderate rain at times": rainy,
    "Moderate or heavy rain with thunder": thunder,
    Overcast: overcast,
    "Partly cloudy": overcast,
    "Patchy rain possible": rainy,
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
              <div className="center">
                <p>
                  {" "}
                  <span id="temp">{weatherData.current.temp_c}°C</span>
                </p>
                <p>
                  {" "}
                  <span id="temp_min">
                    {weatherData.forecast.forecastday[0].day.mintemp_c}°C
                  </span>
                  <span id="slash">/</span>
                  <span id="temp_max">
                    {weatherData.forecast.forecastday[0].day.maxtemp_c}°C
                  </span>
                </p>
              </div>
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
