module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('teacher', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        },
        {
            freezeTableName: true,
        }
    );

    Teacher.associate = (models) => {
        Teacher.belongsTo(models.user);
    };

    return Teacher;
};