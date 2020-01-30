'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_table = sequelize.define('companies', {
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,
    industry: DataTypes.STRING,
    descript: DataTypes.STRING
  }, {});
  user_table.associate = function (models) {
    // associations can be defined here
    user_table.hasMany(models.jobs, { foreignKey: 'company_id' });
  };
  return user_table;
};