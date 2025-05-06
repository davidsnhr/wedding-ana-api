'use strict';

export const up = async (queryInterface, Sequelize) => {
  // Paso 1: Agregar una nueva columna temporal con tipo UUID (permitiendo valores nulos inicialmente)
  await queryInterface.addColumn('Groups', 'temp_id', {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: true, // Permitir valores nulos temporalmente
  });

  // Paso 2: Llenar la columna `temp_id` con valores UUID generados
  await queryInterface.sequelize.query(`
    UPDATE "Groups"
    SET "temp_id" = gen_random_uuid()
  `);

  // Paso 3: Cambiar la columna `temp_id` para que no permita valores nulos
  await queryInterface.changeColumn('Groups', 'temp_id', {
    type: Sequelize.UUID,
    allowNull: false,
  });

  // Paso 4: Eliminar la columna original `id`
  await queryInterface.removeColumn('Groups', 'id');

  // Paso 5: Renombrar la columna temporal `temp_id` a `id`
  await queryInterface.renameColumn('Groups', 'temp_id', 'id');
};

export const down = async (queryInterface, Sequelize) => {
  // Paso 1: Agregar nuevamente la columna `id` como INTEGER
  await queryInterface.addColumn('Groups', 'id', {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  });

  // Paso 2: Eliminar la columna `temp_id`
  await queryInterface.removeColumn('Groups', 'id');
};