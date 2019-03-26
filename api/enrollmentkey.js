module.exports = (app, db) => {

    //Find the classroom and course that associate with the inserted key.
    app.get("/class/enroll/:key", (req, res) =>
        db.enrollment.findAll({
            include: [
                {
                    //get classroom and course data aswell.
                    model: db.classroom, as: 'classroom', include: [
                        {model: db.course}
                    ]
                }
            ],
            where: {
                key: req.params.key
            }
        }).then((result) => res.json(result))
    );
};

