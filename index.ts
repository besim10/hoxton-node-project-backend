import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    include: {photos: true, category: true}, 
  });
  res.send(restaurants);
});
app.get("/albanian-restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    where:{location:{equals: 'Albania'}},
    include: {photos: true, category: true}, 
  });
  res.send(restaurants);
});
app.get("/kosovo-restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    where:{location:{equals: 'Kosovo'}},
    include: {photos: true, category: true}, 
  });
  res.send(restaurants);
});
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.send(categories);
});
app.get("/categories/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const category = await prisma.category.findUnique({
      where: { name: name },
      include: {restaurants: {include: {category: true}}},
    });
    res.send(category);
  } catch (err) {
    //@ts-ignore
    res.status(404).send({ error: err.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server up and running on: http://localhost:${PORT}`);
});
