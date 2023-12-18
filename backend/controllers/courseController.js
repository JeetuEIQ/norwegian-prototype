const { client: db } = require('../config/db')
const {cloudinary} = require('../config/cloudinary')
const crypto = require('crypto')

const { createCourse, createAssignments, createChapter, createVideos } = require("../services/courseCreateServices")
const { fetchCourse, fetchCourseChapters, fetchCourseVideos, fetchCourseQuestions } = require("../services/courseFetchServices")


const postCourse = async (req, res, next) => {
    try {
        const questions = JSON.parse(req.body.questions);
        const chapter = JSON.parse(req.body.chapter);
        const { courseName } = req.body;
        const videos = req.files.map(file => ({
            fieldname: file.fieldname,
            originalname: file.originalname,
            buffer: file.buffer,
            mimetype: file.mimetype,
        }));

        let course_id = await createCourse(res,courseName)

        await Promise.all(Object.keys(chapter).map(async (chap, index) => {
            let chapter_id = await createChapter(res, course_id, chapter[chap].name, chapter[chap].description);

            try {
                // Upload video to Cloudinary
                const selectedFiles = [videos[index]]
                const urls = await Promise.all(selectedFiles.map(file => {
                    return new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { resource_type: 'video' },
                            (error, result) => {
                                if (error) {
                                    console.error(error);
                                    return reject('Error uploading video to Cloudinary');
                                }
                                resolve(result.secure_url);
                            }
                        ).end(file.buffer);
                    });
                }));
                await createVideos(res, chapter_id, urls[0]);
            } catch (error) {
                console.error(error);
                // res.send({ status: 500, error: error.message })
            }
        }))

        Object.keys(questions).map(async (chap, index) => {
            await createAssignments(res, course_id, questions[chap])
        })

        return res.send({ status: 200, data: { id: course_id, questions: questions, chapter: chapter, videos: videos, courseName: courseName } })
    } catch (err) {
        return res.send({ status: 500, message: err.message })
    }
}
const getCourse = async (req, res, next) => {
    try {
        let response = await fetchCourse(res);
        return res.send({status : 200, data : response.rows})
    } catch(err) {
        return res.send({status : 500, message : err.message})
    }
}

const getCourseData = async (req, res, next) => {
    try {
        const course_id = req.body.course_id;
        let response = await fetchCourseChapters(res, course_id);
        const chapters = response.rows
        let videos = {}
        await Promise.all(chapters.map(async (chapter) => {
            try {
                let video_response = await fetchCourseVideos(res, chapter.chapter_id)
                videos[chapter.chapter_id] = video_response.rows[0].url
                // videos.push(video_response.rows[0].url);
                // console.log(`Videos for ${chapter.chapter_id} is : ${video_response.rows[0].url}`)
            } catch(err) {
                return res.send({status : 500 , message : err.message})
            }
        }))
        let questions = await fetchCourseQuestions(res, course_id);
        // console.log("reached till here : ", chapters)
        return res.send({status : 200, data : {chapters : chapters, videos : videos, question : questions.rows} })
    } catch(err) {
        console.log("This is called : ", err.message);
        return res.send({status : 500, message : err.message})
    }
} 


// testing middlewares
const getVideos = async (req, res, next) => {
    try {
        const chapter_id = req.body.chapter_id;
        let response = await fetchCourseVideos(res, chapter_id);
        res.send({status : 200, data : response.rows})
    } catch(err) {
        res.send({status : 500, message : err.message})
    }
}

module.exports = { postCourse, getCourse, getCourseData, getVideos }