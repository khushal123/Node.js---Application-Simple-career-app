'use strict';
module.exports = (sequelize, DataTypes) => {
  const application = sequelize.define('application', {
    candidate_id: DataTypes.INTEGER,
    job_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {});
  application.associate = function (models) {
    // associations can be defined here
    application.belongsTo(models.jobs, { foreignKey: 'job_id'});
    application.belongsTo(models.users, { foreignKey: 'candidate_id', as:"applicant" })
  };
  return application;
};