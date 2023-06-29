export interface WeatherDTO {
  location: {
    name: string;
    region: string;
    country: string;
    lon: number;
    lat: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    cloud: number;
    humidity: number;
    wind_kph: number;
  };
  forecast: {
    forecastday: {
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moon_phase: string;
      };
      day: {
        maxtemp_c: number;
        mintemp_c: number;
      };
    }[];
  };
}

export interface SearchResultDTO {
  lat: number;
  lon: number;
  name: string;
  region: string;
  country: string;
}
