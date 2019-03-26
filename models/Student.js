module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            student_number: DataTypes.INTEGER,
        },
        {
            freezeTableName: true,
        }
    );

    Student.associate = (models) => {
        Student.belongsTo(models.user);
    };

    return Student;
};