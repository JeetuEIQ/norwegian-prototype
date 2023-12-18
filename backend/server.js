const express = require("express");
const http = require('http');
const { Server } = require('socket.io');
const { client: db } = require("./config/db")

/* --------- 
Chinmoy starts
------------*/
const { router } = require("./routes/routes");
const { connect } = require('./DB/dbConnect');
const { LoginSignupRouter } = require('./routes/LoginSignup');
const { signup } = require('./models/AuthModel');
const { vocabRouter } = require('./routes/VocabRoute');


/* --------- 
Chinmoy starts
------------*/

const mainRoutes = require("./routes/mainRoutes")
const courseRoutes = require('./routes/courseRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

require("dotenv").config();

const app = express();
const cors = require('cors');
const corsOptions = {
    origin: true, // The origin of your frontend.
    methods: ['*'],
    credentials: true, // Allow cookies to be sent and received.
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", mainRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/notification", notificationRoutes);

/* --------- 
Chinmoy starts
------------*/
//routes
app.use("/", router)
app.use("/", LoginSignupRouter)
app.use("/", vocabRouter)

/* --------- 
Chinmoy starts
------------*/


const server = http.createServer(app);
const io = new Server(server, {
    cors: corsOptions
});

const connectedUsers = {}

io.on('connection', (socket) => {
    console.log('A user connected with ID : ', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('adminLogin', (userId) => {
        connectedUsers[userId] = socket.id // Map user ID to socket ID
    });

    socket.on("liked", () => {
        console.log("user with id : ", socket.id, " just liked your video")
    })
    socket.on("view", (obj) => {
        const targetSocketId = connectedUsers[obj.user_id];
        console.log("CONNECT : ", connectedUsers, " < user : ", obj.user_id)
        console.log(`user with ID : ${socket.id} just enrolled to your course : ${obj.course_name}`)
        if (targetSocketId) {
            io.to(targetSocketId).emit('recieveNotification', { senderId: socket.id, ...obj });
            console.log("in here")
        } else {
            console.log("target socket : ", targetSocketId)
        }
        // io.to(obj.user_id).emit('notification', { senderId: socket.id, ...obj });
        // socket.broadcast.emit("receiveNotification", {userId : socket.id, ...obj})
    })
});

const PORT = process.env.PORT || 9000
server.listen(PORT, async () => {
    await connect();
    console.log("LISTENING ON PORT : ", PORT)
})
// app.listen(PORT, console.log("LISTENING ON PORT : ", PORT))