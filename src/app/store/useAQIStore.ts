import { create } from "zustand";

export interface I_WAQI {
  aqi: number | null;
  pm10: number | null;
  pm25: number | null;
}
export interface I_SC {
  pm10: number | null;
  pm25: number | null;
  temperature: number | null;
  humidity: number | null;
}
export type T_lastUpdated = {
  key: keyof I_WAQI | keyof I_SC | "";
  value: number | null;
};

export interface I_AQI {
  waqiData: I_WAQI;
  scData: I_SC;

  lastUpdated: T_lastUpdated;
  lastUpdatedTime: number;

  updateWaqiData: (whichKeys: Partial<I_WAQI>) => void;
  updateScData: (whichKeys: Partial<I_SC>) => void;
  setLastUpdatedTime: (newLastUpdatedTime: number) => void;
}

export const useAQIStore = create<I_AQI>((set, get) => ({
  waqiData: {
    aqi: null,
    pm10: null,
    pm25: null,
  },
  scData: {
    pm10: null,
    pm25: null,
    temperature: null,
    humidity: null,
  },
  lastUpdated: { key: "", value: null },
  lastUpdatedTime: Date.now(),

  updateWaqiData: ({ aqi: aqi, pm10: pm10, pm25: pm25 }) => {
    const newData = { ...get().waqiData };
    let newLastUpdated: T_lastUpdated = { ...get().lastUpdated };

    if (aqi == null && pm10 == null && pm25 == null) return;

    if (pm10 != null && newData.pm10 != pm10) {
      newData.pm10 = pm10;
      newLastUpdated = { key: "pm10", value: pm10 };
    }
    if (pm25 != null && newData.pm25 != pm25) {
      newData.pm25 = pm25;
      newLastUpdated = { key: "pm25", value: pm25 };
    }
    if (aqi != null && newData.aqi != aqi) {
      newData.aqi = aqi;
      newLastUpdated = { key: "aqi", value: aqi };
    }

    set({
      waqiData: newData,
      lastUpdated: newLastUpdated,
      lastUpdatedTime: Date.now(),
    });
  },

  updateScData: ({
    pm10: pm10,
    pm25: pm25,
    temperature: temperature,
    humidity: humidity,
  }) => {
    const newData = { ...get().scData };
    let newLastUpdated: T_lastUpdated = { ...get().lastUpdated };

    if (
      (pm10 == null || pm10 == newData.pm10) &&
      (pm25 == null || pm25 == newData.pm25) &&
      (temperature == null || temperature == newData.temperature) &&
      (humidity == null || humidity == newData.humidity)
    )
      return;

    if (humidity != null && newData.humidity != humidity) {
      newData.humidity = humidity;
      newLastUpdated = { key: "humidity", value: humidity };
    }
    if (pm10 != null && newData.pm10 != pm10) {
      newData.pm10 = pm10;
      newLastUpdated = { key: "pm10", value: pm10 };
    }
    if (temperature != null && newData.temperature != temperature) {
      newData.temperature = temperature;
      newLastUpdated = { key: "temperature", value: temperature };
    }
    if (pm25 != null && newData.pm25 != pm25) {
      newData.pm25 = pm25;
      newLastUpdated = { key: "pm25", value: pm25 };
    }

    set({
      scData: newData,
      lastUpdated: newLastUpdated,
      lastUpdatedTime: Date.now(),
    });
  },
  setLastUpdatedTime: (newLastUpdatedTime: number) => {
    set({ lastUpdatedTime: newLastUpdatedTime });
  },
}));
