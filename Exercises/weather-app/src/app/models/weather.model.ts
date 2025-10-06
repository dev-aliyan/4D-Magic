export interface WeatherResponse {
  weather: Array<{ main : string; description: string; icon: string }>;
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; humidity: number };
  name: string;
  wind: { speed: number };
  sys: { country: string };
  error?: boolean;
}

export interface WeatherView {
  city: string;
  country: string;
  temp: number;
  description: string;
  iconUrl: string;
  humidity: number;
  wind: number;
}
