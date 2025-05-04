import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './models/index.js'; // Importa la instancia de Sequelize
// import guestRoutes from './routes/guestRoute.js';
import groupRoutes from './routes/groupRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use('/api/guests', guestRoutes);
app.use('/api/groups', groupRoutes);

// Verificar la conexión a la base de datos
const { sequelize } = db;

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa con la base de datos');

    // Iniciar el servidor solo si la conexión es exitosa
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1); // Salir del proceso si no se puede conectar
  });


