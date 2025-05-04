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
