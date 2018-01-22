module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
    });

    User.associate = (models) => {
        // User.hasMany(models.TodoItem, {
        //   foreignKey: 'todoId',
        //   as: 'todoItems',
        // });
    };

    return User;
};