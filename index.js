const express = require("express");
var http = require("http");
const cors = require("cors");
const { log } = require("console");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre

app.use(express.json());
var clients = {};

app.use(cors());


io.on("connection", (socket) => {
    console.log("connection");
    console.log(socket.id, "has joined");
    socket.on("signin", (id)=>{
        console.log(id);
        clients[id]=socket;
    });
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetId = msg.targetId;
        if (clients[targetId]) clients[targetId].emit("message",msg);
    })
});
app.route("/check").get((req,res)=>{
    return res.json("Your aoo is working fine");
});

server.listen(port, "0.0.0.0", () => {
    console.log("Server Started");
});
