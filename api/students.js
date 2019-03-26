module.exports = (app, db) => {
    //Get all students
    app.get("/students", (req, res) =>
        db.student.findAll({include: [db.user]}).then((result) => res.json(result))
    );

    //Find student by id.
    app.get("/student/:id", (req, res) =>
        db.student.findById(req.params.id).then((result) => res.json(result))
    );

    //Create new student & a new user. And link them together.
    app.post("/student/", (req, res) =>
        //First create user
        db.user.create({
            name: req.body.name,
            initials: req.body.initials,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
        }).then((result1) => {
            //If the user is done then create student and attach them with the userId
                db.student.create({
                    student_number: req.body.student_number,
                    userId: result1.id,
                }).then((result2) => res.json(result1 + result2))
            }
        )
    );
};