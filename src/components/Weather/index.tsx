import React, { useState, useCallback, useEffect } from "react";

import type { SearchResultDTO, WeatherDTO } from "../../types";

import { Env } from "../../Env";
import { WeatherCard } from "../WeatherCard";
import SearchIcon from "../../icons/searchIcon";

import "./index.css";

const DEFAULT_POSITION = {
  lat: 48.87,
  long: 2.33,
};

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
      if (searchValue === "") {
        throw new Error("Please enter a location");
      } else {
        setSearchResults(json);
      }
    } catch (err) {
      alert("Could not fetch weather...\n" + (err as Error).message);
    }
  }, [searchValue, setSearchResults]);

  const onSearchResultClick = useCallback(
    (result: SearchResultDTO) => {
      fetchData({
        lat: result.lat,
        long: result.lon,
      }).then(() => setSearchResults(null));
    },
    [fetchData, setSearchResults]
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
        if (error instanceof GeolocationPositionError) {
          const geolocationPositionErrorMessages: Record<number, string> = {
            [GeolocationPositionError.PERMISSION_DENIED]:
              "user declined permission to retrieve position",
            [GeolocationPositionError.POSITION_UNAVAILABLE]:
              "user agent could not retrieve position",
            [GeolocationPositionError.TIMEOUT]:
              "could not retrieve position, time out reached",
          };

          const errorMessage = geolocationPositionErrorMessages[error.code];
          console.log(
            `Could not get position: ${errorMessage}. Using default location instead.`
          );

          return fetchData(DEFAULT_POSITION);
        }
        alert(`Could not get position: ${(error as Error).message}`);
        return undefined;
      }
    );
  }, []);

  if (data == null) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div className="search" style={{ position: "relative" }}>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter location"
          className="search_input"
        />
        <div className="city_searcher" onClick={onSearch}>
          <SearchIcon />
        </div>
        {searchResults != null && (
          <div className="search_suggestion" style={{ position: "absolute" }}>
            {searchResults.map((result) => (
              <div
                key={[result.name, result.region, result.country].join(":")}
                onClick={onSearchResultClick.bind(null, result)}
              >
                <span id="result">
                  {result.name} {result.region} {result.country}
                </span>
                <div className="stroke"></div>
              </div>
            ))}
          </div>
        )}
      </div>
      <WeatherCard weatherData={data} />
    </div>
  );
};
