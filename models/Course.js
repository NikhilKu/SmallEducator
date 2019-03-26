module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('course', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: DataTypes.STRING,
            ects: DataTypes.INTEGER,
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            freezeTableName: true,
        }
    );

    Course.associate = (models) => {
    };

    return Course;
};