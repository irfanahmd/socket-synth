const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

require("dotenv").config();
require("./config/database");

app.use(logger("dev"));
app.use(express.json());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));

// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  const {roomId} = socket.handshake.query;
  socket.join(roomId);

  socket.on('play', playMsg => {
    io.in(roomId).emit('play', playMsg)
  })
  socket.on('stop', stopMsg => {
    io.in(roomId).emit('stop', stopMsg)
  })
    socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

server.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
