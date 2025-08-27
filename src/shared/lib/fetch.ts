import { useAQIStore } from "@/app/store/useAQIStore";
import { getWAQIValues, getClosestSensor, getSensorValues } from "../api/index";
import { FetchSchema_WAQI } from "../models/index";
import { FetchSchema_SC } from "../models/index";

const POINT_LATITUDE = process.env.NEXT_PUBLIC_POINT_LATITUDE;
const POINT_LONGITUDE = process.env.NEXT_PUBLIC_POINT_LONGITUDE;

export const fetcherWAQI = async (link: string): Promise<FetchSchema_WAQI> => {
  const response = await fetch(link);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.status !== "ok") {
    throw new Error(`WAQI API error: ${json.data}`);
  }

  const { aqi, pm10, pm25 } = getWAQIValues(json);

  const formattedData: FetchSchema_WAQI = {
    aqi: aqi ?? null,
    pm10: pm10 ?? null,
    pm25: pm25 ?? null,
  };

  // update zustand store /////
  useAQIStore.getState().setLastUpdatedTime(Date.now());
  console.log(formattedData);
  return formattedData;
};

export const fetcherSC = async (link: string): Promise<FetchSchema_SC> => {
  const response = await fetch(link);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  const closestSensor = getClosestSensor(
    { lat: Number(POINT_LATITUDE), lon: Number(POINT_LONGITUDE) },
    json
  );

  const { pm10, pm25, temperature, humidity } = getSensorValues(closestSensor);

  const formattedData: FetchSchema_SC = {
    pm25: pm25 ?? null,
    temperature: temperature ?? null,
    pm10: pm10 ?? null,
    humidity: humidity ?? null,
  };

  // update zustand store /////
  useAQIStore.getState().setLastUpdatedTime(Date.now());
  console.log(formattedData);
  return formattedData;
};
