import React, { useState, useCallback, useEffect } from "react";

import type { WeatherDTO } from "../../types";

import { Env } from "../../Env";
import { WeatherCard } from "../WeatherCard";

export const Weather = () => {
  const [city, setCity] = useState<null | WeatherDTO>(null);
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [data, setData] = useState<null | WeatherDTO>(null);

  const fetchData = useCallback(
    async ({ lat, long }: { lat: number; long: number }) => {
      console.log("lat,long:", { lat, long });

      try {
        const weatherEndpoint = `${Env.API_URL}/weather?lat=${lat}&lon=${long}&units=metric&appid=${Env.API_ID}`;

        const res = await fetch(weatherEndpoint);
        const json = (await res.json()) as WeatherDTO;

        console.log("json:", json);

        setData(json);
      } catch (err) {
        alert(
          "Could not fetch weather based on your position...\n" +
            (err as Error).message
        );
      }
    },
    [setData]
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchData({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      (error) => {
        alert("Could not get position:" + error.message);
      }
    );
  }, []);

  if (data == null) {
    return <p>loading...</p>;
  }

  return <WeatherCard weatherData={data} />;
};
