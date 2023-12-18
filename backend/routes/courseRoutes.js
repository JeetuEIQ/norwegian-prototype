const router = require('express').Router();
const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { postCourse, getCourse, getCourseData } = require("../controllers/courseController")

router.route("/create").post(upload.array('videos'), postCourse)
router.route("/get-course").get(getCourse);
router.route("/get-course-data").post(getCourseData);
// router.route("/create").post(upload.array("videos"), postCourse)

// testing routes

// const { getVideos } = require("../controllers/courseController")
// router.route("/fetch-videos").post(getVideos)
module.exports = router