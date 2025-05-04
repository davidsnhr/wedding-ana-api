'use strict';

export const up = async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('Guests', 'lastName', {
    type: Sequelize.STRING,
    allowNull: true, // Cambia esto según tus necesidades
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.removeColumn('Guests', 'lastName');
};