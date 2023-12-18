const {client : db} = require("../config/db")
const fetchCourse = async (res) => {
    try {
        let response = await db.query("SELECT * FROM course")
        return response
    } catch(err) {
        res.send({status : 500, message : err.message})
    }
}

const fetchCourseChapters = async (res, course_id) => {
    try {
        let chapters = await db.query("SELECT * FROM chapters where course_id = $1", [course_id])
        return chapters
    } catch(err) {
        res.send({status : 500, message : err.message})
    }
}
const fetchCourseVideos = async (res, chapter_id) => {
    try {
        let videos = await db.query("SELECT url FROM videos where chapter_id = $1",[ chapter_id])
        return videos
    } catch(err) {
        res.send({status : 500, message : err.message})
    }
}
const fetchCourseQuestions = async (res, course_id) => {
    try {
        let questions = await db.query("SELECT question FROM assignments WHERE course_id = $1" , [course_id])
        // console.log("These are the questions : ", questions);
        return questions
    } catch(err) {
        res.send({status : 500, message : err.message})
    }
}
module.exports = { fetchCourse, fetchCourseChapters, fetchCourseVideos, fetchCourseQuestions }