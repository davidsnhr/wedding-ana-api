import dotenv from 'dotenv';
dotenv.config();

// export default {
//   development: {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT
//   }
// };

export default {
  development: {
    use_env_variable: 'DB_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Cambia esto a true si tienes un certificado SSL válido
      },
    },
  },
};
