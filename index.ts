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
    include: { photos: true },
  });
  res.send(restaurants);
});
app.listen(PORT, () => {
  console.log(`Server up and running on: http://localhost:${PORT}`);
});
