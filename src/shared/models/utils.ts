import { APP_CONSTS } from "./consts";

export interface Indication {
  title: string;
  desc: string;
  color: string;
}

export function getIndication(aqiValue: number | null): Indication {
  let title;
  let desc;
  let color;

  if (aqiValue == null) {
    title = "no data";
    desc = "no data";
    color = "no data";
    return { title, desc, color };
  }

  if (aqiValue > APP_CONSTS.aqiBreakpoint.bad) {
    title = APP_CONSTS.indicationTile.titleBad;
    desc = APP_CONSTS.indicationTile.descBad;
    color = APP_CONSTS.indicationTile.colorBad;
  } else if (aqiValue > APP_CONSTS.aqiBreakpoint.average) {
    title = APP_CONSTS.indicationTile.titleAverage;
    desc = APP_CONSTS.indicationTile.descAverage;
    color = APP_CONSTS.indicationTile.colorAverage;
  } else if (aqiValue > APP_CONSTS.aqiBreakpoint.good) {
    title = APP_CONSTS.indicationTile.titleGood;
    desc = APP_CONSTS.indicationTile.descGood;
    color = APP_CONSTS.indicationTile.colorGood;
  } else {
    title = "no data";
    desc = "no data";
    color = "no data";
  }

  return { title, desc, color };
}
