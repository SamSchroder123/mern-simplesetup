router.route("/api/users").post(userCtrl.create);
router.route("/api/users").get(userCtrl.list);
