const { Client } = require("pg");

// For using environment variables declared in .env
require("dotenv").config();

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'norwegian test',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

client.connect((err, client, done) => {
  if (err) {
    console.log("Error in connecting db", err)
  } else {
    console.log("DB connected");
    // client.on('notification',(msg)=>{
    //   console.log(msg.payload);
    // })
    // client.query("LISTEN update_notification");
  }
})
process.on("SIGINT", () => {
  console.log("Closing DB connection on app termination");
  client.end();
  process.exit();
});

module.exports = { client }
