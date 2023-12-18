const {client : db} = require('../config/db')
const crypto = require('crypto')
const createCourse = async (res , courseName) => {
    try {
        const courseId = crypto.randomUUID()
        await db.query(`INSERT INTO course (course_id, course_name) VALUES($1, $2)`, [courseId, courseName])
        return courseId
    } catch(err) {
        console.log("Error at db upon creating the course : ", err.message)
        res.send({status : 500, message : err.message})
    }
}

const createChapter = async (err, course_id, chapter_name, chapter_description) => {
    try {
        const chapter_id = crypto.randomUUID();
        await db.query(`INSERT INTO chapters (chapter_id, course_id, chapter_name, chapter_description) VALUES ($1, $2, $3, $4)`, [chapter_id, course_id, chapter_name, chapter_description])
        return chapter_id
    } catch(err) {
        console.log("error at inserting into the chapters table : ", err.message);
        res.send({status : 500, message : err.message})
    }
}

const createVideos = async (res, chapter_id, url) => {
    try {
        const video_id = crypto.randomUUID();
        console.log("These are chapter_id : ", chapter_id , " url : ", url)
        await db.query(`INSERT INTO videos (video_id, chapter_id, url) VALUES ($1, $2, $3)`, [video_id, chapter_id, url])
    } catch(err) {
        console.log("ERROR at uploading the video ", err.message);
        // res.send({status : 500, message : err.message})
    }
}

const createAssignments = async (res, course_id, question) => {
    try {
        const assignment_id = crypto.randomUUID();
        await db.query(`INSERT INTO assignments (assignment_id, course_id, question) VALUES ($1, $2, $3)`, [assignment_id, course_id, question])
    } catch(err) {
        console.log("ERror at db upon creating an assignment")
        res.send({status : 500, message : err.message})
    }
}

module.exports = { createCourse, createAssignments, createChapter, createVideos }