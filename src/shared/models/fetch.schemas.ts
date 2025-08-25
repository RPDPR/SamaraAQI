export type SC_Sensor = {
  location: { latitude: number; longitude: number };
  sensordatavalues: {
    id: number;
    value: string;
    value_type: string;
  }[];
};

export interface FetchSchema_WAQI {
  aqi: number;
  pm10: number;
  pm25: number;
}

export interface FetchSchema_SC {
  pm10: number;
  pm25: number;
  temperature: number;
  humidity: number;
}
