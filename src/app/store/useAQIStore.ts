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

export interface I_AQI {
  waqiData: I_WAQI;
  scData: I_SC;

  lastUpdated: {
    [K in keyof (I_WAQI & I_SC)]: { key: K; value: (I_WAQI & I_SC)[K] };
  }[keyof (I_WAQI & I_SC)][];
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
  lastUpdated: [],
  lastUpdatedTime: Date.now(),

  updateWaqiData: ({ aqi: aqi, pm10: pm10, pm25: pm25 }) => {
    set((state) => {
      const newData = { ...state.waqiData };
      const newLastUpdated = [...state.lastUpdated];

      if (aqi != undefined) {
        newData.aqi = aqi;
        newLastUpdated.unshift({ key: "aqi", value: aqi });
      }
      if (pm25 != undefined) {
        newData.pm25 = pm25;
        newLastUpdated.unshift({ key: "pm25", value: pm25 });
      }
      if (pm10 != undefined) {
        newData.pm10 = pm10;
        newLastUpdated.unshift({ key: "pm10", value: pm10 });
      }

      // array cleaning /////
      if (newLastUpdated.length >= 10) {
        newLastUpdated.splice(10);
      }

      return {
        waqiData: newData,
        lastUpdated: newLastUpdated,
        lastUpdatedTime: Date.now(),
      };
    });
  },

  updateScData: ({
    pm10: pm10,
    pm25: pm25,
    temperature: temperature,
    humidity: humidity,
  }) => {
    set((state) => {
      const newData = { ...state.scData };
      const newLastUpdated = [...state.lastUpdated];

      if (pm25 != undefined && pm25 != null && newData.pm25 != pm25) {
        newData.pm25 = pm25;
        newLastUpdated.unshift({ key: "pm25", value: pm25 });
      }
      if (
        temperature != undefined &&
        temperature != null &&
        newData.temperature != temperature
      ) {
        newData.temperature = temperature;
        newLastUpdated.unshift({ key: "temperature", value: temperature });
      }
      if (pm10 != undefined && pm10 != null && newData.pm10 != pm10) {
        newData.pm10 = pm10;
        newLastUpdated.unshift({ key: "pm10", value: pm10 });
      }
      if (
        humidity != undefined &&
        humidity != null &&
        newData.humidity != humidity
      ) {
        newData.humidity = humidity;
        newLastUpdated.unshift({ key: "humidity", value: humidity });
      }

      // array cleaning /////
      if (newLastUpdated.length >= 10) {
        newLastUpdated.splice(10);
      }

      return {
        scData: newData,
        lastUpdated: newLastUpdated,
        lastUpdatedTime: Date.now(),
      };
    });
  },
  setLastUpdatedTime: (newLastUpdatedTime: number) => {
    set({ lastUpdatedTime: newLastUpdatedTime });
  },
}));
