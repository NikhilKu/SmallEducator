module.exports = (app, db) => {
    //Get all teachers
    app.get("/teachers", (req, res) =>
        db.teacher.findAll({include: [db.user]}).then((result) => res.json(result))
    );

    //Find teacher by id
    app.get("/teacher/:id", (req, res) =>
        db.teacher.findById(req.params.id).then((result) => res.json(result))
    );

    //Create new teacher & a new user. And link them together.
    app.post("/teacher/", (req, res) =>
        //First create user
        db.user.create({
            name: req.body.name,
            initials: req.body.initials,
            lastname: req.body.lastname,
            birthdate: req.body.birthdate,
        }).then((result1) => {
            //If the user is done then create student and attach them with the userId
                db.teacher.create({
                    userId: result1.id,
                }).then((result2) => res.json(result1 + result2))
            }
        )
    );

    app.put("/teacher/:id", (req, res) =>
        db.user.update({
                name: req.body.name,
                initials: req.body.initials,
                lastname: req.body.lastname,
                birthdate: req.body.birthdate,
            },
            {
                where: {
                    id: req.params.id
                }
            }).then((result) => res.json(result))
    );

    app.delete("/teacher/:id", (req, res) =>
        db.teacher.destroy({
            where: {
                userId: req.params.id
            }
        }).then((result) => {
            db.user.destroy({
                where: {
                    id: req.params.id
                }
            }).then((result) => res.json(result));
        })
    );
};