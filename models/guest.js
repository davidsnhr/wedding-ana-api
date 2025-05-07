'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Guest extends Model {
    static associate(models) {
      Guest.belongsTo(models.Group, {
        foreignKey: 'groupId',
        as: 'group',
      });
    }
  }

  Guest.init(
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      groupId: {
        type: DataTypes.UUID, // Cambia el tipo a UUID
        allowNull: false, // Asegúrate de que no permita valores nulos si es obligatorio
      },
    },
    {
      sequelize,
      modelName: 'Guest',
    }
  );

  return Guest;
};
