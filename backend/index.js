const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

//json
app.use(express.json());

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//test api
app.get("/test", (req, res) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get all users
app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//create user
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//update user
app.put("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
