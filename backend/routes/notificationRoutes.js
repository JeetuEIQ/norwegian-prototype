const router = require("express").Router()
const { getNotification, postNotification, updateNotification } = require('../controllers/notificationController')

router.route("/get-notification").post(getNotification)
router.route("/set-notification").post(postNotification)
router.route("/update-notification").post(updateNotification);

module.exports = router