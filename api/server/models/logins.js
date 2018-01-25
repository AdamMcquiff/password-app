module.exports = (sequelize, DataTypes) => {
  const Logins = sequelize.define('Logins', {
    ip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datetime: {
      type: DataTypes.DATE
    }
  });

  Logins.associate = (models) => {
    Logins.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
  };

  return Logins;
};