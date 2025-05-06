'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Group extends Model {
    static associate(models) {
      Group.hasMany(models.Guest, {
        foreignKey: 'groupId',
        as: 'guests',
      });
    }
  }

  Group.init(
    {
      id: {
        type: DataTypes.UUID, // Define el tipo como UUID
        defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID v4
        primaryKey: true, // Marca este campo como la clave primaria
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      confirmedGuests: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 },
      },
    },
    {
      sequelize,
      modelName: 'Group',
    }
  );

  return Group;
};
