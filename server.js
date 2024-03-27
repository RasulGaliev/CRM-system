import http from "http";
import app from "./app.js";

const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () =>
  console.log(`Listening on http://localhost:${port}`.underline.yellow)
);
