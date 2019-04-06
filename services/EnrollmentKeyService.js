class EnrollmentKeyService {
    constructor(classroom, db) {
        this.classroom = classroom;
        this.db = db;
        this.generate();
    }

    generate() {
        //Generate random number with 10 digits.
        var key = Math.floor(1000000000 + Math.random()  * 9000000000);
        if (this.isKeyUnique()){
            this.key = key;
            this.saveKey();
        } else{
            this.generate();
        }
    }

    isKeyUnique(key) {
        //Check key is unique or not.
        return this.db.enrollment.count({where: {key: key}})
            .then(count => {
                if (count != 0) {
                    return false;
                }
                return true;
            });
    }

    saveKey() {
        //Save the key in database and return the result. (200 status)
        this.db.enrollment.create({
            key: this.key,
            teacherId: 1,
            classroomId: this.classroom,
        }).then((result) => {
                return result;
            }
        )
    }
}

module.exports = (EnrollmentKeyService);