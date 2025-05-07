'use strict';

export const up = async (queryInterface, Sequelize) => {
  // Paso 1: Agregar una nueva columna temporal con tipo UUID
  await queryInterface.addColumn('Guests', 'temp_groupId', {
    type: Sequelize.UUID,
    allowNull: true, // Permitir valores nulos temporalmente
  });

  // Paso 2: Copiar los valores de la columna `groupId` a `temp_groupId` (conversión manual)
  await queryInterface.sequelize.query(`
    UPDATE "Guests"
    SET "temp_groupId" = gen_random_uuid()
    WHERE "groupId" IS NOT NULL
  `);

  // Paso 3: Eliminar la columna original `groupId`
  await queryInterface.removeColumn('Guests', 'groupId');

  // Paso 4: Renombrar la columna temporal `temp_groupId` a `groupId`
  await queryInterface.renameColumn('Guests', 'temp_groupId', 'groupId');

  // Paso 5: Cambiar la columna `groupId` para que no permita valores nulos
  await queryInterface.changeColumn('Guests', 'groupId', {
    type: Sequelize.UUID,
    allowNull: false,
  });
};

export const down = async (queryInterface, Sequelize) => {
  // Revertir los cambios: restaurar `groupId` como INTEGER
  await queryInterface.addColumn('Guests', 'groupId', {
    type: Sequelize.INTEGER,
    allowNull: false,
  });

  await queryInterface.removeColumn('Guests', 'groupId');
};
