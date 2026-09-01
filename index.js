const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRouter = require("./routers/todo");

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URL || process.env.MONGO_URI || "mongodb://localhost:27017/todo";

app.use(cors());
app.use(express.json());
app.use("/todos", todoRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("몽고디비 연결 성공");
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  })
  .catch((err) => {
    console.error("몽고디비 연결 실패:", err);
  });
