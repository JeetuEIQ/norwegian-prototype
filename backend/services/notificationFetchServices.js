const {client : db} = require('../config/db')

const fetchNotification = async (user_id) => {
    try {
        let response = await db.query(`SELECT * FROM notifications where user_id = $1`, [user_id])
        return {status : 200, data : response.rows}
    } catch(err) {
        return {status : 500, message : err.message}
    }
}

const setNotification = async (user_id, notification_count) => {
    try {
        let user = await db.query(`SELECT user_id FROM notifications where user_id = $1`, [user_id])
        if (user.rowCount > 0) {
            await db.query(`UPDATE notifications SET notification = $1 where user_id = $2`, [notification_count, user_id])
        } else {
            await db.query(`INSERT INTO notifications (user_id, notification) VALUES ($1, $2)`, [user_id, notification_count])
        }
        return {status : 200, message : "SuccessFully Added"}
    } catch(err) {
        return {status : 500, message  : err.message}
    }
}   

const update = async (user_id) => {
    try {
        let user = await db.query(`SELECT * FROM notifications where user_id = $1`, [user_id])
        // console.log("USER : " , parseInt(user.rows[0].notification) + 1);
        if (user.rowCount > 0) {
            await db.query(`UPDATE notifications SET notification = $1 where user_id = $2`, [`${parseInt(user.rows[0].notification) + 1}`, user_id])
        } else {
            await db.query(`INSERT INTO notifications (user_id, notification) VALUES ($1, $2)`, [user_id, 1])
        }
        return {status : 200, message : "SuccessFully Added"}
    } catch(err) {
        return {status : 500, message :err.message}
    }
}

module.exports = { fetchNotification, setNotification, update }