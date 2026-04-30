🚀 SETUP BACKEND (Paso a paso)

1. Crear proyecto
-------------------
mkdir backend
cd backend
npm init -y


2. Dependencias principales (runtime)
--------------------------------------
npm install express pg dotenv cors

express → servidor backend
pg → conexión a PostgreSQL
dotenv → variables de entorno (.env)
cors → permitir conexión con frontend


3. Dependencias de desarrollo
---------------------------------
npm install -D typescript ts-node-dev node-pg-migrate @types/node @types/express @types/cors

typescript → lenguaje
ts-node-dev → ejecutar TS con auto-reload
node-pg-migrate → migraciones DB
@types/... → tipos para TypeScript


4. Inicializar TypeScript
--------------------------------
npx tsc --init


5. Estructura base
----------------------
mkdir src
touch src/app.ts


6. Scripts (package.json)
------------------------------
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
  "build": "tsc",
  "start": "node dist/app.js",
  "migrate": "node-pg-migrate"
}


🧠 RESUMEN CLAVE

Backend listo con:
- Express
- PostgreSQL (pg)
- TypeScript
- Migraciones (node-pg-migrate)


SIGUIENTE PASO

npm run migrate create init