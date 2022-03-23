import { Prisma, PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
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
app.get("/restaurants/:name", async (req, res) => {
  const name = req.params.name

  const restaurant = await prisma.restaurant.findUnique({where: {name}, include:{category:true, photos: true}})
  res.send(restaurant);
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
function createToken(id: number) {
  //@ts-ignore
  const token = jwt.sign({ id: id }, process.env.SECRET_KEY, {
    expiresIn: "3days",
  });
  return token;
}
app.post("/sign-in", async(req, res) => {
  const {email, password} = req.body
  
  try{
    const user = await prisma.user.findUnique({
      where: {email: email},
      include: {reservations: {include: {restaurant: true }}, favoriteRestaurants: {include: {restaurant: true}}
    }})
    //@ts-ignore
    const passwordMatches = bcrypt.compareSync(password, user.password)
  if(user && passwordMatches){
    res.send({ user, token: createToken(user.id)})
  }else{
    throw Error("Boom!")
  }
  }catch(err){
  //@ts-ignore
  res.status(400).send({ error: "Email/Password invalid!" });
  }
  })

app.post("/register", async (req, res) => {
    const { fullName, email, password, phoneNumber } = req.body;
  
    const hash = bcrypt.hashSync(password);
    try {
      const user = await prisma.user.create({
        data: { fullName, email, password: hash, phoneNumber },
        include: { favoriteRestaurants: {include: {restaurant: true}}, reservations: {include: {restaurant: true}}} },
      );
      res.send({ user, token: createToken(user.id) });
    } catch (err) {
      //@ts-ignore
      res.status(400).send({ error: err.message });
    }
  });
  async function getUserFromToken(token: string) {
    //@ts-ignore
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
      // @ts-ignore
      where: { id: data.id },
      include: { favoriteRestaurants: {include: {restaurant: true}}, reservations:{include: {restaurant: true}} },
    });
  
    return user;
  }
app.get("/validate", async (req, res) => {
    const token = req.headers.authorization;
  
    try {
      //@ts-ignore
      const user = await getUserFromToken(token);
      res.send(user);
    } catch (err) {
      //@ts-ignore
      res.status(400).send({ error: err.message });
    }
  });
app.listen(PORT, () => {
  console.log(`Server up and running on: http://localhost:${PORT}`);
});
