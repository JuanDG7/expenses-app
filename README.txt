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
npm install -D typescript ts-node-dev node-pg-migrate @types/node @types/express @types/cors @types/pg

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
touch src/app.ts src/db.ts src/server.ts
touch .env


6. Scripts (package.json)
------------------------------
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "migrate": "node-pg-migrate"
}


🧠 RESUMEN CLAVE

Backend listo con:
- Express
- PostgreSQL (pg)
- TypeScript
- Migraciones (node-pg-migrate)


7. Crear primera migración
------------------------------
npm run migrate create create-expenses-table

Esto crea una carpeta migrations en la raíz del proyecto y dentro un archivo de migración.

El archivo tiene dos funciones:

up   → aplica cambios en la base de datos
down → revierte cambios en la base de datos


8. Crear tabla expenses
------------------------------
En la función up se crea la tabla expenses con:

- id
- title
- amount
- category
- date
- created_at
- updated_at

En la función down se elimina la tabla expenses usando:

DROP TABLE IF EXISTS expenses;


9. Ejecutar migración
------------------------------
npm run migrate up
Esto crea realmente la tabla en PostgreSQL.
