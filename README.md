# AQI SAMARA | RPD | 08/30/2025

[![Demo on Vercel](https://img.shields.io/badge/vercel-demo-black?logo=vercel)](https://samara-aqi.vercel.app/)

## QUICK SETUP TO GO:

### 1 (CLONE REPOSITORY)

```cmd
git clone https://github.com/RPDPR/SamaraAQI
cd samaraaqi
```

### 2 (INSTALL DEPENDENCIES):

```cmd
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### 3 (EDIT ENVIRONMENT VARIABLES)

Create a file named **_.env.local_** in the project root and add:

```env
NEXT_PUBLIC_WAQI_API_TOKEN=YOUR_TOKEN # insert your token on WAQI API ( get in on https://aqicn.org/data-platform/token ) here or try a 'demo' one. (you can either just insert your latitude and longitude below)
NEXT_PUBLIC_POINT_LATITUDE=YOUR_LATITUDE # insert your latitude here. (for exmp. 53.2036)
NEXT_PUBLIC_POINT_LONGITUDE=YOUR_LONGITUDE # insert your longitude here. (for exmp. 50.1678)
```

Change inner variables on your data

### 4 (RUN THE PROJECT)

```cmd
# development

# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun dev


# production (build + start)

# npm
npm run build
npm run start

# yarn
yarn build
yarn start

# pnpm
pnpm build
pnpm start

# bun
bun build
bun start
```

## **_AND THAT'S IT! HAVE A NICE DAY!_**

### Additionally:

It took me **_4 days_** of work.
Passed **_A, C and half of B_** levels of a test task.
The test task is avalaible at **[this link](https://github.com/gooddelo/frontend-test-task)**.

Thanks to Gooddelo team for that experience.
