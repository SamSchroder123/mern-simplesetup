import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

router.route("/api/users").post(userCtrl.create);
router.route("/api/users").get(userCtrl.list);
router.param("userId", userCtrl.userByID);
router.route("/api/users/:userId").get(userCtrl.read);
router.route("/api/users/:userId").put(userCtrl.update);
router.route("/api/users/:userId").delete(userCtrl.remove);
router
  .route("/api/users/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);
