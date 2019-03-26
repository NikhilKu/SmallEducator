
module.exports = (app, db) => {
    //Get all courses
    app.get( "/courses", (req, res) =>
        db.course.findAll().then( (result) => res.json(result) )
    );

    //Find course by id
    app.get( "/course/:id", (req, res) =>
        db.course.findById(req.params.id).then( (result) => res.json(result))
    );

    //Create new course
    app.post("/course/", (req, res) =>
        db.course.create({
            title: req.body.title,
            description: req.body.description,
            ects: req.body.ects,
        }).then((result) => res.json(result) )
    );
};