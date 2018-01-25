module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        alternativeEmail: {
            type: DataTypes.STRING,
        },
        securityQuestionOne: {
            type: DataTypes.STRING,
        },
        securityQuestionOneAnswer: {
            type: DataTypes.STRING,
        },
        securityQuestionTwo: {
            type: DataTypes.STRING,
        },
        securityQuestionTwoAnswer: {
            type: DataTypes.STRING,
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.Logins, {
          foreignKey: 'userId'
        });
    };

    return Users;
};