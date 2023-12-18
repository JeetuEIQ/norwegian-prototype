const { fetchNotification, setNotification, update } = require("../services/notificationFetchServices");

const getNotification = async (req, res, next) => {
    try {
        const {user_id} = req.body;
        let response = await fetchNotification(user_id);
        // console.log("This is response : ", response);
        return res.send(response)
    } catch(err) {  
        // console.log("Is this working")
        return res.send({status : 500, message: err.message})
    }
}

const postNotification = async (req, res, next) => {
    try {
        const { notification_count, user_id } = req.body;
        let response = await setNotification(user_id, notification_count);
        return res.send(response);
    } catch(err) {
        return res.send({status : 500, message: err.message})
    }
}

const updateNotification = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        let response = await update(user_id);
        return res.send(response);
    } catch(err) {
        return res.send({status : 500, message : err.message})
    }
}

module.exports = { getNotification, postNotification, updateNotification }