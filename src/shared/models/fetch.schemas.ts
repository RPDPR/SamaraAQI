export type WAQI_Response = {
  data: {
    aqi: number | string | null;
    iaqi: {
      pm10: { v: number | string | null };
      pm25: { v: number | string | null };
    };
  } | null;
};

export type SC_Sensor = {
  location: { latitude: number; longitude: number };
  sensordatavalues: {
    id: number | string | null;
    value: number | string | null;
    value_type: number | string | null;
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
