import React, { FC } from "react";
import { utcToZonedTime, format } from "date-fns-tz";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { fr } from "date-fns/locale";

import { WeatherDTO } from "../../types";
import "./index.css";

setDefaultOptions({
  locale: fr,
});

interface WeatherCardProps {
  weatherData: WeatherDTO;
}

export const WeatherCard: FC<WeatherCardProps> = ({ weatherData }) => (
  <div className="mainDiv">
    <div className="weatherContainer">
      <div className="header">
        <p>{weatherData.location.name}</p>
      </div>
      <div className="row">
        <div className="temperature">
          <p>
            Temperature: <span id="temp">{weatherData.current.temp_c}°C</span>
          </p>
          {/* <p>
            Temperature min:{" "}
            <span id="temp_min">{weatherData.main.temp_min}°C</span>
          </p>
          <p>
            Temperature max:
            <span id="temp_max"> {weatherData.main.temp_max}°C</span>
          </p> */}
        </div>
        <div className="sky">
          <p>Clouds: {weatherData.current.cloud}%</p>
          <p>Wind: {weatherData.current.wind_kph}Km/h</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
        </div>
      </div>
      <div className="sunrise_sunset">
        {/* <p>
          Sunrise:
          {weatherData.astro.sunrise}
          "HH:mm"
        </p> */}
        {/* <p>
          Sunset:{" "}
          {format(
            utcToZonedTime(
              new Date(weatherData.astro.sunset * 1000),
              Intl.DateTimeFormat().resolvedOptions().timeZone
            ),
            "HH:mm"
          )}
        </p> */}
      </div>
    </div>
  </div>
);
