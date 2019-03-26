const EnrollmentKeyService = require("../services/EnrollmentKeyService");

module.exports = (app, db) => {
    //Get all calsses
    app.get("/classes", (req, res) =>
        db.classroom.findAll({include: [db.course, db.enrollment, db.student]}).then((result) => res.json(result))
    );

    //Get class by id
    app.get("/class/:id", (req, res) =>
        db.classroom.findById(req.params.id).then((result) => res.json(result))
    );

    //Create new class & generate new enrollmentkey see EnrollmentkeyService
    app.post("/class/", (req, res) =>
        db.classroom.create({
            name: req.body.name,
            courseId: req.body.courseId,
        }).then((classroom) => {
                new EnrollmentKeyService(classroom.id, db);
                res.json(classroom)
            }
        )
    );


//Attach a list of students to a class.
    app.post("/class/:id/students", (req, res) => {
            classroomId = req.params.id;
            result = null;
            req.body.students.forEach((student) => {
                db.class_student.create({
                    studentId: student,
                    classroomId: classroomId,
                }).then((result) => {

                    }
                )
            });
            res.json(result);
        }
    );
}
;