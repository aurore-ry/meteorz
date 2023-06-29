import React, { useState, useCallback, useEffect, FC } from "react";

import type { SearchResultDTO, WeatherDTO } from "../../types";

import { Env } from "../../Env";
import { WeatherCard } from "../WeatherCard";

export const Weather = () => {
  const [data, setData] = useState<null | WeatherDTO>(null);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<
    null | SearchResultDTO[]
  >();

  const fetchData = useCallback(
    async ({ lat, long }: { lat: number; long: number }) => {
      console.log("lat,long:", { lat, long });

      try {
        const weatherEndpoint = `${Env.API_URL}/forecast.json?key=${Env.API_ID}&q=${lat},${long}`;

        const res = await fetch(weatherEndpoint);
        const json = (await res.json()) as WeatherDTO;

        console.log("weatherEndpoint:", json);

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

  const onSearch = useCallback(async () => {
    try {
      const searchEndpoint = `${Env.API_URL}/search.json?key=${Env.API_ID}&q=${searchValue}`;
      const res = await fetch(searchEndpoint);
      const json = (await res.json()) as SearchResultDTO[];
      console.log("json city: ", json);
      setSearchResults(json);
    } catch (err) {
      alert("Could not fetch weather...\n" + (err as Error).message);
    }
  }, [searchValue, setSearchResults]);

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

  return (
    <div>
      <div className="search">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter location"
          className="search_input"
        />
        <button className="city_searcher" onClick={onSearch}>
          Search Location
        </button>
        <div>
          {searchResults != null ? (
            searchResults.map((result) => (
              <button
                key={[result.name, result.region, result.country].join(":")}
                onClick={fetchData.bind(null, {
                  lat: result.lat,
                  long: result.lon,
                })}
              >
                {result.name} - {result.region} - {result.country}
              </button>
            ))
          ) : (
            <p>no search results yet</p>
          )}
        </div>
      </div>
      <WeatherCard weatherData={data} />
    </div>
  );
};
