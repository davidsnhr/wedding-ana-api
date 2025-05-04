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
      groupId: DataTypes.INTEGER, 
    },
    {
      sequelize,
      modelName: 'Guest',
    }
  );

  return Guest;
};
