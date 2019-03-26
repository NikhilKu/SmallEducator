module.exports = (sequelize, DataTypes) => {
    const Classroom = sequelize.define('classroom', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING
        },
        {
            freezeTableName: true,
        }
    );

    Classroom.associate = (models) => {
        const ClassStudent = models.class_student;
        Classroom.belongsToMany(models.student, {through: ClassStudent});
        Classroom.belongsTo(models.course);
        Classroom.hasOne(models.enrollment);
    };

    return Classroom;
};