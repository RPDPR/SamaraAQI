export type WAQI_Response = {
  data: {
    aqi: number | null;
    iaqi: {
      pm10: { v: number | null };
      pm25: { v: number | null };
    };
  };
};

export type SC_Sensor = {
  location: { latitude: number; longitude: number };
  sensordatavalues: {
    id: number;
    value: number | null;
    value_type: string;
  }[];
};

export interface FetchSchema_WAQI {
  aqi: number | null;
  pm10: number | null;
  pm25: number | null;
}

export interface FetchSchema_SC {
  pm10: number | null;
  pm25: number | null;
  temperature: number | null;
  humidity: number | null;
}
