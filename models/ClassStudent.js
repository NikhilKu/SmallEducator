module.exports = (sequelize, DataTypes) => {
    const ClassStudent = sequelize.define('class_student',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        },
        {
            freezeTableName: true,
        }
    );

    ClassStudent.associate = (models) => {
        ClassStudent.belongsTo(models.classroom);
    };

    return ClassStudent;
};