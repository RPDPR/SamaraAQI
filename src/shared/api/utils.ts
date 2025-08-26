import { SC_Sensor } from "../models/index";

export function getDistToSensor(
  point: { lat: number; lon: number },
  sensor: { lat: number; lon: number }
) {
  return Math.hypot(point.lat - sensor.lat, point.lon - sensor.lon);
}

export function getClosestSensor(
  point: { lat: number; lon: number },
  sensors: SC_Sensor[]
) {
  let closestSensor: SC_Sensor = {
    location: { latitude: 0, longitude: 0 },
    sensordatavalues: [
      {
        id: 0,
        value: "",
        value_type: "",
      },
    ],
  };
  let closestDistToSensor: number | null | undefined;

  sensors.forEach((obj) => {
    const distToSensor = getDistToSensor(point, {
      lat: obj.location.latitude,
      lon: obj.location.longitude,
    });
    if (
      closestDistToSensor == undefined ||
      closestDistToSensor == null ||
      distToSensor < closestDistToSensor
    ) {
      closestDistToSensor = distToSensor;
      closestSensor = obj;
    }
  });
  return closestSensor;
}

export function getSensorValues(sensor: SC_Sensor) {
  const sensorValues: {
    pm10: string | null;
    pm25: string | null;
    temperature: string | null;
    humidity: string | null;
  } = {
    pm10: null,
    pm25: null,
    temperature: null,
    humidity: null,
  };

  sensor.sensordatavalues.forEach((el) => {
    const valueType = el.value_type;
    switch (valueType) {
      case "P1":
        sensorValues.pm10 = el.value;
        break;
      case "P2":
        sensorValues.pm25 = el.value;
        break;
      case "temperature":
        sensorValues.temperature = el.value;
        break;
      case "humidity":
        sensorValues.humidity = el.value;
        break;
    }
  });
  return sensorValues;
}

export function convertPM25ToAQI(pm25: number = 0): number {
  if (typeof pm25 != "number") return 0;
  const breakpoints = [
    { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
    { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 },
  ];

  const bp = breakpoints.find((b) => pm25 >= b.cLow && pm25 <= b.cHigh);
  if (!bp) return -1;

  return Math.round(
    ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.iLow
  );
}
