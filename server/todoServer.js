const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

try {
  mongoose
    .connect("mongodb://127.0.0.1:27017/todoApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to database"));
} catch (err) {
  console.log(err);
}

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const todoSchema = new mongoose.Schema({
  collectionName: { type: String },
  description: { type: String, required: true },
  isCompleted: { type: Boolean }
});

const Collection = mongoose.model("Collection", collectionSchema);
const Todo = mongoose.model("Todo", todoSchema);

app.get("/", async (req, res) => {
  try {
    const collections = await Collection.find();
    res.json(collections);
  } catch (err) {
    console.log(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const newCollection = new Collection({
      name: req.body.name,
    });
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (err) {
    res.status(400).json({ error: "Error creating collection" });
  }
});

app.get("/:collection", async (req, res) => {
  try {
    const todos = await Todo.find({ collectionName: req.params.collection });
    res.json(todos);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Collection.findByIdAndDelete(id);
    res.status(200).json({ message: 'Collection deleted succesfully' })
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/:collection/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.status(200).json(todo)
    } else {
      res.status(400).json({ message: "Todo not found" })
    }
  }
  catch (error) {
    console.log(error);
  }
})

app.post("/:collection", async (req, res) => {
  try {
    const newTodo = new Todo({
      collectionName: req.params.collection,
      description: req.body.description,
      isCompleted: req.body.isCompleted
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: "Error creating todo" });
  }
});

app.put("/:collection/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
    });
    if (result) {
      res.status(200).json({ message: "Todo updated successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating todo" });
  }
});

app.post("/:collection/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(req.params.id, {
      isCompleted: req.body.isCompleted,
    });
    if (result) {
      res.status(200).json({ message: "Todo updated successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error updating todo" });
  }
});

app.delete("/:collection/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
