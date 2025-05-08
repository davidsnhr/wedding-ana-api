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
      phone: { // Cambiado de email a phone
        type: DataTypes.STRING,
        allowNull: true, // Cambia esto según tus necesidades (true o false)
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Guest',
    }
  );

  return Guest;
};
