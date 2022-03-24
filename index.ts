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
    where:{location: 'Albania'},
    include: {photos: true, category: true}, 
  });
  res.send(restaurants);
});
app.get("/kosovo-restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({
    where:{location:'Kosovo'},
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
      where: { name },
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
      include: { favoriteRestaurants: {include: {restaurant: {include: {category:true}}}}, reservations:{include: {restaurant: {include:{category: true}}}} },
    });
  
    return user;
  }

  app.post('/reservation', async(req,res) => {
    const {userId, restaurantId, persons, dateAndTime} = req.body
    const token = req.headers.authorization;
    try{
      await prisma.reservation.create({data: {userId, restaurantId, persons, dateAndTime}})
      const user = await getUserFromToken(token as string)
      if(user){
        res.send(user)
      }
    }catch(err: any){
      res.status(400).send({ error: err.message });
    }
  })
  app.post('/favorites', async(req,res) => {
    const {userId, restaurantId} = req.body
    const token = req.headers.authorization;
    try{
      await prisma.favoriteRestaurant.create({data: {userId, restaurantId}})
      const user = await getUserFromToken(token as string)
      if(user){
        res.send(user)
      }
    }catch(err: any){
      res.status(400).send({ error: err.message });
    }
  })
  app.delete("/favorites/:id", async (req, res) => {
    const id = Number(req.params.id);
    const token = req.headers.authorization || "";
    try {
      const user = await getUserFromToken(token);
      //@ts-ignore
      const matchedFavorited = user.favoriteRestaurants.find((favRestaurant) => favRestaurant.id === id);
  
      if (user && matchedFavorited) {
        const favoritedRestaurant = await prisma.favoriteRestaurant.findUnique({ where: { id } });
  
        if (favoritedRestaurant) {
          await prisma.favoriteRestaurant.delete({ where: { id } });
          const user = await getUserFromToken(token);
          res.send(user);
        } else {
          res.status(404).send({ error: "Favorite Restaurant not found." });
        }
      }
    } catch (err) {
      // @ts-ignore
      res.status(400).send({ err: err.message });
    }
  });
  app.delete("/reservation/:id", async (req, res) => {
    const id = Number(req.params.id);
    const token = req.headers.authorization || "";
    try {
      const user = await getUserFromToken(token);
      //@ts-ignore
      const matchedReservation = user.reservations.find((reservation) => reservation.id === id);
  
      if (user && matchedReservation) {
        const reservation = await prisma.reservation.findUnique({ where: { id } });
  
        if (reservation) {
          await prisma.reservation.delete({ where: { id } });
          const user = await getUserFromToken(token);
          res.send(user);
        } else {
          res.status(404).send({ error: "Reservation not found." });
        }
      }
    } catch (err) {
      // @ts-ignore
      res.status(400).send({ err: err.message });
    }
  });
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
