# AQI SAMARA | RPD | 08/30/2025

### QUICK SET UP TO GO:

### 1 (CLONE REPOSITORY)
```cmd
git clone https://github.com/RPDPR/SamaraAQI
cd samaraaqi
```

### 2 (INSTALL DEPENDENCIES):
```cmd
# npm
npm install

# yarn / pnpm / bun
# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### 3 (EDIT ENVIRONMENT VARIABLES)
Create a file named `.env.local` in the project root and add:

```env
NEXT_PUBLIC_WAQI_API_TOKEN=YOUR_TOKEN # insert your token here or try a 'demo' one. (you can either just insert your latitude and longitude)
NEXT_PUBLIC_POINT_LATITUDE=YOUR_LATITUDE # insert your latitude here. (for exmp. 53.2036)
NEXT_PUBLIC_POINT_LONGITUDE=YOUR_LONGITUDE # insert your longitude here. (for exmp. 50.1678)
```

### 4 (RUN THE PROJECT)
```cmd
# development
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# production (build + start)
npm run build && npm run start
# or
yarn build && yarn start
# or
pnpm build && pnpm start
```

AND THAT'S IT! HAVE A GOOD DAY!



Additionally:
It took me a 4 days of working.
Passed A, C and B on a half levels of a test task.
Thanks to Gooddelo team for that experience.




