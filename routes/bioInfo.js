module.exports = app => {
    const Bio = app.db.models.Bio;

    app.route("/api/bios")
        // .all(app.auth.authenticate())
        /**
         * @api {get} /api/bios List the user's bio information
         * @apiGroup Bio/Health info
         * @apiSuccess {Object[]} bios Bio info list
         * @apiSuccess {Number} bios.id Bio id
         * @apiSuccess {String} bios.passportPicture Bio passportPicture
         * @apiSuccess {String} bios.fullName Bio fullName
         * @apiSuccess {String} bios.dateOfBirth Bio dateOfbirth
         * @apiSuccess {String} bios.bloodType Bio bloodType
         * @apiSuccess {String} bios.bloodDonor Bio bloodDonor
         * @apiSuccess {String} bios.allergies Bio allergies
         * @apiSuccess {String} bios.medication Bio medication
         * @apiSuccess {String} bios.infections Bio infections
         * @apiSuccess {String} bios.handicap Bio handicap
         * @apiSuccess {String} bios.location Bio location
         * @apiSuccess {String} bios.height Bio height
         * @apiSuccess {String} bios.weight Bio weight
         * @apiSuccess {String} bios.bodyMassIndex Bio bodyMassIndex
         * @apiSuccess {Date} bios.updated_at Update's date
         * @apiSuccess {Date} bios.created_at Register's date
         * @apiSuccess {Number} bios.user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    [{
         *      "id": 1,
         *      "fullName": "Penrose Akoto",
         *      "dateOfBirth": "1990-04-10",
         *      "bloodType": "A+",
         *      "bloodDonor": "Agnes",
         *      "allergies": "White sand",
         *      "location": "North Ridge",
         *      "updated_at": "2019-01-10T15:46:51.778Z",
         *      "created_at": "2019-01-10T15:46:51.778Z",
         *      "user_id": 1
         *    }]
         * @apiErrorExample {json} List error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Bio.findAll({
                // where: { user_id: req.user.id }
            })
            .then(result => { console.log(`get the user bio info ${JSON.stringify(result)}`); res.json(result)})
            .catch(error => {
                console.log(`error getting user bio info ${error}`);
                res.status(412).json({msg: error.message});
            });
        })
        /**
         * @api {post} /api/bios Create a new bio info
         * @apiGroup Bio/Health info
         * @apiParam {String} passportPicture Bios passportPicture
         * @apiParam {String} fullName Bio info fullName
         * @apiParam {String} dateOfBirth Bio info dateOfBirth
         * @apiParam {String} bloodType Bio info bloodType
         * @apiParam {String} bloodDonor Bio info bloodDonor
         * @apiParam {String} allergies Bio info allergies
         * @apiParam {String} medications Bio info medications
         * @apiParam {String} infections Bio info infections
         * @apiParam {String} handicap Bio info handicap
         * @apiParam {String} location Bio info location
         * @apiParam {String} height Bio info medications
         * @apiParam {String} weight Bio info medications
         * @apiParam {String} bodyMassIndex Bio info bodyMassIndex
         * @apiParamExample {json} Input
         *    {
         *      "fulName": "Penrose Akoto",
         *      "dateOfBirth": 1990-04-29
         *    }
         * @apiSuccess {Number} id Task id
         * @apiSuccess {String} fullName Bios fullName
         * @apiSuccess {String} dateOfBirth Bios dateOfBirth
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "fullName": "Penrose Akoto",
         *      "dateOfBirth": "1988-06-28",
         *      "updated_at": "2019-01-10T15:46:51.778Z",
         *      "created_at": "2019-01-10T15:46:51.778Z",
         *      "user_id": 1
         *    }
         * @apiErrorExample {json} Register error
         *    HTTP/1.1 412 Precondition Failed
         */
        .post((req, res) => {
            // req.body.user_id = req.user.id;
            console.log(`new bio info request ${JSON.stringify(req.body)}`);
            Bio.create(req.body)
                .then(result => { console.log(`successful bio info created ${JSON.stringify(result)}`); res.json(result) })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/bio/:id")
        // .all(app.auth.authenticate())
        /**
         * @api {get} /api/bio/:id Get a bio
         * @apiGroup Bio/Health info
         * @apiParam {id} id Bio info id
         * @apiSuccess {Number} id Task id
         * @apiSuccess {String} passportPicture Bio passportPicture
         * @apiSuccess {String} fullName Bio info fullName
         * @apiSuccess {String} dateOfBirth Bio info dateOfbirth
         * @apiSuccess {String} bloodType Bio info bloodType
         * @apiSuccess {String} bloodDonor Bio info bloodDonor
         * @apiSuccess {String} allergies Bio info allergies
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *       "fullName": "Penrose Akoto",
         *      "dateOfBirth": "1990-04-10",
         *      "bloodType": "A+",
         *      "bloodDonor": "Agnes",
         *      "allergies": "White sand",
         *      "location": "North Ridge",
         *      "updated_at": "2019-01-10T15:46:51.778Z",
         *      "created_at": "2019-01-10T15:46:51.778Z",
         *      "user_id": 1
         *    }
         * @apiErrorExample {json} Task not found error
         *    HTTP/1.1 404 Not Found
         * @apiErrorExample {json} Find error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Bio.findOne({ where: {
                    id: req.params.id,
                    // user_id: req.user.id
                }})
                .then(result => {
                    if (result) {
                        console.log(`find one bio info ${result}`);
                        res.json(result);
                    } else {
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        /**
         * @api {put} /api/bio/:id Update a bio info
         * @apiGroup Bio/Health info
         * @apiParam {id} id Bio id
         * @apiParam {String} passportPicture Bios passportPicture
         * @apiParam {String} fullName Bio info fullName
         * @apiParam {String} dateOfBirth Bio info dateOfBirth
         * @apiParam {String} bloodType Bio info bloodType
         * @apiParam {String} bloodDonor Bio info bloodDonor
         * @apiParam {String} allergies Bio info allergies
         * @apiParam {String} medications Bio info medications
         * @apiParamExample {json} Input
         *    {
         *      "fulName": "Penrose Akoto",
         *      "dateOfBirth": 1990-04-29
         *    }
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Update error
         *    HTTP/1.1 412 Precondition Failed
         */
        .put((req, res) => {
            Bio.update(req.body, { where: {
                    id: req.params.id,
                    // user_id: req.user.id
                }})
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        /**
         * @api {delete} /api/bio/:id Remove a task
         * @apiGroup Bio/Health info
         * @apiParam {id} id Bio id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Delete error
         *    HTTP/1.1 412 Precondition Failed
         */
        .delete((req, res) => {
            Bio.destroy({ where: {
                    id: req.params.id,
                    // user_id: req.user.id
                }}) 
                .then(result => {console.log; res.sendStatus(204) })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });                                                            
        });
};
