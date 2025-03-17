import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import route from "./routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", route);

// let connectedClients = [];

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);
//   connectedClients.push(socket.id);
//   console.log("Connected clients:", connectedClients);
//   socket.on("newComment", (data) => {
//     console.log("New comment:", data);
//     socket.broadcast.emit("commentAdded", data);
//   });
//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//     connectedClients = connectedClients.filter(client => client !== socket.id);
//     console.log("Connected clients:", connectedClients);
//   });
// });

connectDB();
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
