'use strict';
module.exports = (Sequelize, DataTypes) => {
  const user_table = Sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    userType: DataTypes.STRING,
    password: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    mobile: {
      type: DataTypes.STRING
    }
  }, {});
  user_table.associate = function (models) {
    // associations can be defined here
    user_table.hasMany(models.application, {
      foreignKey: 'candidate_id',
    });
    user_table.hasMany(models.jobs, { foreignKey: 'posted_by' });
  };
  return user_table;
};