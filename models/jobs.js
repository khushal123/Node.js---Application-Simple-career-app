'use strict';
module.exports = (sequelize, DataTypes) => {
  const job_table = sequelize.define('jobs', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    posted_by: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {});
  job_table.associate = function (models) {
    // associations can be defined here
    job_table.belongsTo(models.users, { foreignKey: 'posted_by', as: "created_by" });
    job_table.belongsTo(models.companies, { foreignKey: 'company_id' });
    job_table.hasMany(models.application, { foreignKey: 'job_id' });

  };
  return job_table;
};