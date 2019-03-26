module.exports = (sequelize, DataTypes) => {
    const Enrollment = sequelize.define('enrollment', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            key: DataTypes.BIGINT
        },
        {
            freezeTableName: true,
        }
    );
    Enrollment.associate = (models) => {
        Enrollment.belongsTo(models.teacher);
        Enrollment.belongsTo(models.classroom);
    };

    return Enrollment;
};