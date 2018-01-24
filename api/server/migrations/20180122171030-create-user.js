module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      alternativeEmail: {
        allowNull: true,
        type: Sequelize.STRING
      },
      securityQuestionOne: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      securityQuestionOneAnswer: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      securityQuestionTwo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      securityQuestionTwoAnswer: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};