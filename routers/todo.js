const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// 할일 목록 조회
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: "할일 조회에 실패했습니다.", error: err.message });
  }
});

// 할일 생성
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "할일 제목을 입력해주세요." });
    }

    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "할일 생성에 실패했습니다.", error: err.message });
  }
});

// 할일 수정
router.put("/:id", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "할일 제목을 입력해주세요." });
    }

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "할일을 찾을 수 없습니다." });
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: "할일 수정에 실패했습니다.", error: err.message });
  }
});

// 할일 삭제
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "할일을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "할일이 삭제되었습니다.", todo });
  } catch (err) {
    res.status(500).json({ message: "할일 삭제에 실패했습니다.", error: err.message });
  }
});

module.exports = router;
