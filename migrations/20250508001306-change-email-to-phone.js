'use strict';

export const up = async (queryInterface, Sequelize) => {
  // Eliminar la columna `email`
  await queryInterface.removeColumn('Guests', 'email');

  // Agregar la columna `phone`
  await queryInterface.addColumn('Guests', 'phone', {
    type: Sequelize.STRING,
    allowNull: true, // Cambia esto según tus necesidades
  });
};

export const down = async (queryInterface, Sequelize) => {
  // Revertir los cambios: agregar nuevamente la columna `email`
  await queryInterface.addColumn('Guests', 'email', {
    type: Sequelize.STRING,
    allowNull: true,
  });

  // Eliminar la columna `phone`
  await queryInterface.removeColumn('Guests', 'phone');
};
