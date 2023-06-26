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
    conditions: {
      text: string;
      icon: string;
      code: number;
    };
    cloud: number;
    humidity: number;
    wind_kph: number;
  };
}
