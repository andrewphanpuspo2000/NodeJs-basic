import { EventEmitter } from "events";
import express from "express";

const app = express();
const eemter = new EventEmitter();

eemter.on("clicklog", () => {
  console.log("Andrew log");
});
console.log("first");
eemter.emit("clicklog");

//liveserver
app.listen("8000", (error) => {
  error ? error : console.log("server running");
});
// routers
app.get("/", (req, res) => {
  res.send("Hello World + on localhost/800");
});
app.get("/register", (req, res) => {
  res.send("Hello World + on localhost/800");
});
