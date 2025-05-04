import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg'; // Importa el cliente de PostgreSQL
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  dialectModule: pg, // Especifica el cliente de PostgreSQL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para Neon
    },
  },
});

const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file !== 'index.js' &&
      file.slice(-3) === '.js'
  );

for (const file of files) {
  const modelModule = await import(join(__dirname, file));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
