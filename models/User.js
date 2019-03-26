module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            initials: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastname: DataTypes.STRING,
            birthdate: DataTypes.DATEONLY,
        },
        {
            freezeTableName: true,
        }
    );

    return User;
};