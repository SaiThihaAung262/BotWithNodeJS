require("dotenv").config();

const http = require("http");

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => {});

server.listen(PORT);

server.on("listening", () => {
  console.log(`Server is listening on port ${PORT}`);
});
