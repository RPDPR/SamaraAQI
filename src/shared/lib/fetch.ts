import { useAQIStore } from "@/app/store/useAQIStore";
import { getClosestSensor, getSensorValues } from "../api/index";
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

  const formattedData: FetchSchema_WAQI = {
    aqi: Number(json?.data?.aqi) ?? null,
    pm10: Number(json?.data?.iaqi.pm10.v) ?? null,
    pm25: Number(json?.data?.iaqi.pm25.v) ?? null,
  };

  // update zustand store /////
  useAQIStore.getState().setLastUpdatedTime(Date.now());
  console.log(json);
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
  console.log(closestSensor); // sensor log /////
  const { pm10, pm25, temperature, humidity } = getSensorValues(closestSensor);

  const formattedData: FetchSchema_SC = {
    pm10: Number(pm10) ?? null,
    pm25: Number(pm25) ?? null,
    temperature: Number(temperature) ?? null,
    humidity: Number(humidity) ?? null,
  };

  // update zustand store /////
  useAQIStore.getState().setLastUpdatedTime(Date.now());

  return formattedData;
};
