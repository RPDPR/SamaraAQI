const token = process.env.NEXT_PUBLIC_WAQI_API_TOKEN;

export const API_LINKS = {
  waqi: `https://api.waqi.info/feed/A472336/?token=${token}`,

  sc: "https://data.sensor.community/static/v1/data.json",
};
