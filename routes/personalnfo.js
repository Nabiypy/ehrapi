module.exports = app => {
    const Profile = app.db.models.Profile;

    app.route("/api/profiles")
        // .all(app.auth.authenticate())
        /**
         * @api {get} /api/profiles List the user's tasks
         * @apiGroup Personal Info
         * @apiSuccess {Object[]} tasks Task's list
         * @apiSuccess {Number} profiles.id Profile id
         * @apiSuccess {String} profiles.levelOfEducation Profile levelOfEducation
         * @apiSuccess {Boolean} profiles.done Profile is done?
         * @apiSuccess {Date} profiles.updated_at Update's date
         * @apiSuccess {Date} profiles.created_at Register's date
         * @apiSuccess {Number} profiles.user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    [{
         *      "id": 1,
         *      "levelOfEducation": "Tertiary",
         *      "done": false,
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }]
         * @apiErrorExample {json} List error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Profile.findAll({
                // where: { user_id: req.user.id }
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        /**
         * @api {post} /api/profiles Create Patients Profile
         * @apiGroup Personal Info
         * @apiParam {String} levelofEducation Profile levelofEducation
         * @apiParam {String} spokenLanguages Profile spokenLanguages
         * @apiParamExample {json} Input
         *    {"levelOfEduction": "Tertiary"}
         * @apiSuccess {Number} id Task id
         * @apiSuccess {String} title Task title
         * @apiSuccess {Boolean} done false Task is done?
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "title": "Study",
         *      "done": false,
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }
         * @apiErrorExample {json} Register error
         *    HTTP/1.1 412 Precondition Failed
         */
        .post((req, res) => {
            // req.body.user_id = req.user.id; 
            console.log(`new profile request >>> ${req.body}`);
            Profile.create(req.body)
                .then(result => { 
                    console.log(`profile created successfully >>> ${JSON.stringify(result)}`); 
                    res.json(result) 
                })
                .catch(error => {
                    console.log(`error creating profile`);
                    res.status(412).json({msg: error.message});
                });
        });

    app.route("/api/profile/:id")
        // .all(app.auth.authenticate())
        /**
         * @api {get} /api/profile/:id Get a profile
         * @apiGroup Personal Info
         * @apiParam {id} id Profile id
         * @apiSuccess {Number} id Profile id
         * @apiSuccess {String} title Profile title
         * @apiSuccess {Boolean} done Profile is done?
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} created_at Register's date
         * @apiSuccess {Number} user_id User id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 200 OK
         *    {
         *      "id": 1,
         *      "title": "Study",
         *      "done": false
         *      "updated_at": "2016-02-10T15:46:51.778Z",
         *      "created_at": "2016-02-10T15:46:51.778Z",
         *      "user_id": 1
         *    }
         * @apiErrorExample {json} Task not found error
         *    HTTP/1.1 404 Not Found
         * @apiErrorExample {json} Find error
         *    HTTP/1.1 412 Precondition Failed
         */
        .get((req, res) => {
            Profile.findOne({ where: {
                    id: req.params.id,
                    // user_id: req.user.id
                }})
                .then(result => {
                    if (result) {
                        console.log(` get a personal infomaton >>> ${JSON.stringify(result)}`);
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
         * @api {put} /api/profile/:id Update a task
         * @apiGroup Personal Info
         * @apiParam {id} id Profile id
         * @apiParam {String} title Profile title
         * @apiParam {Boolean} done Profile is done?
         * @apiParamExample {json} Input
         *    {
         *      "levelOfEducation": "Postgraduate",
         *      "spokenLanguages": "French"
         *    }
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Update error
         *    HTTP/1.1 412 Precondition Failed
         */
        .put((req, res) => {
            Profile.update(req.body, { where: {
                    id: req.params.id,
                    // user_id: req.user.id
                }})
                .then(result => { 
                    console.log(`Profile update successful ${JSON.stringify(result)}`); 
                    res.sendStatus(204)
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        })
        /**
         * @api {delete} /api/profile/:id Remove a task
         * @apiGroup Personal Info
         * @apiParam {id} id Profile id
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Delete error
         *    HTTP/1.1 412 Precondition Failed
         */
        .delete((req, res) => {
            Profile.destroy({ where: {
                    id: req.params.id,
                    // user_id: req.user.id
                }})
                .then(result => { 
                    console.log(`Profile successfully deleted ${JSON.stringify(result)}`); 
                    res.sendStatus(204)
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                });
        });
};
