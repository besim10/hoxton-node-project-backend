import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({ log: ["query", "error", "warn", "info"] });

const categories: Prisma.CategoryCreateInput[] = [
  {
    name: "Italian",
  },
  {
    name: "Turkish",
  },
  {
    name: "European",
  },
  {
    name: "Mexican",
  },
];
const restaurants: Prisma.RestaurantCreateInput[] = [
  {
    name: `Izi's Apartment197`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/19/fa/ef/20/izi-s-apartment-197-on.jpg",
    description:
      "IZI'S Apartment 197 on Street B. A long-awaited novelty in the capital's advanced spectrum of cafes & pubs. Here, we have paid attention to every angle! IZI'S Apartment 197 - You're In The Right Place!",
    location: "Kosovo",
    category: { connect: { name: "Italian" } },
    address: "Rruga B, Pristina Kosovo",
    website: "https://izisapartment197.com",
    email: "izi@gmail.com",
    phoneNumber: "+377 44 555 553",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/19/fa/ef/f4/izi-s-apartment-197-on.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/19/fa/ef/fa/izi-s-apartment-197-on.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/19/fb/fe/60/one-of-the-best-drink.jpg",
        },
      ],
    },
  },
  {
    name: `Ginnis Pizzeria`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/15/29/ce/6f/photo4jpg.jpg",
    description: "Dinner, Breakfast, Lunch, Brunch",
    location: "Kosovo",
    category: { connect: { name: "Italian" } },
    address: "Bill Clinton Boulevard, Pristina",
    email: "ginnis@gmail.com",
    phoneNumber: "+38345475752",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/15/29/ce/6f/photo4jpg.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/08/fd/8b/72/ginnis-pizzeria.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/15/29/ce/6c/photo1jpg.jpg",
        },
      ],
    },
  },
  {
    name: `Liburnia Restaurant`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-p/17/c7/01/c0/liburnia-restaurant.jpg",
    description: "Vegetarian Friendly, Vegan Options, Gluten Free Options",
    location: "Kosovo",
    category: { connect: { name: "European" } },
    address: "Rr.Meto Bajraktari, Pristina",
    website: "https://www.facebook.com/Liburnia",
    email: "liburnia@gmail.com",
    phoneNumber: "+377 44 891 000",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-p/17/c7/01/c0/liburnia-restaurant.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/07/92/3a/2d/liburnia-restaurant.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/07/92/39/33/liburnia-restaurant.jpg",
        },
      ],
    },
  },
  {
    name: `Gagi Restaurant`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/1d/c8/6c/b3/grilled-sea-bream.jpg",
    description: "Vegetarian Friendly",
    location: "Kosovo",
    category: { connect: { name: "European" } },
    address: "Fehmi Agani, 1, Pristina 10000",
    website: "http://www.gagirestaurant.com",
    email: "info@gagicafe.com",
    phoneNumber: "+383 44 160 665",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/c8/6c/b3/grilled-sea-bream.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/0b/4f/34/f9/gagi-steak.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/05/11/27/d5/gagi-cafe.jpg",
        },
      ],
    },
  },
  {
    name: `Bay Dönerpz`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/1d/3f/16/66/bay-donerpzfirst-100.jpg",
    description: "Turkish",
    location: "Kosovo",
    category: { connect: { name: "Turkish" } },
    address: "Seshsi I Shadervanit Ne.43, Prizren",
    email: "bay@gmail.com",
    phoneNumber: "+383 49 534 300",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/3f/16/66/bay-donerpzfirst-100.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/3f/15/31/100-meet-turkish-meet.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/3f/16/d5/photo0jpg.jpg",
        },
      ],
    },
  },
  {
    name: `Ben Tatlises Doner`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/09/ff/14/e8/ben-tatlises-doner.jpg",
    description: "Turkish",
    location: "Kosovo",
    category: { connect: { name: "Turkish" } },
    address: "Sheshi Zahir Pajazit Tek Eulexi, Pristina",
    website: "https://www.facebook.com/benTatlisesPRISHTINA",
    email: "@gmail.com",
    phoneNumber: "045905050",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/09/ff/14/e8/ben-tatlises-doner.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/09/ff/14/eb/ben-tatlises-doner.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/09/ff/14/f0/ben-tatlises-doner.jpg",
        },
      ],
    },
  },
  {
    name: `Mexicana`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/0f/59/42/40/photo1jpg.jpg",
    description: "Mexican, Latin, Spanish",
    location: "Kosovo",
    category: { connect: { name: "Mexican" } },
    address: "Abdyl Frasheri st., Muhagjeret district, Pristina",
    email: "@gmail.com",
    phoneNumber: "044 149 783",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/59/42/40/photo1jpg.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/07/1d/37/85/taquitos-fritos-and-chimichang.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-p/12/e6/5c/e5/photo1jpg.jpg",
        },
      ],
    },
  },
  {
    name: `Eat Mucho`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/1b/d0/9d/91/the-front-of-the-restaurant.jpg",
    description:
      "Delivery, Reservations, Outdoor Seating, Seating, Street Parking, Serves Alcohol, Free Wifi, Accepts Credit Cards, Family style, Non-smoking restaurants",
    location: "Kosovo",
    category: { connect: { name: "Mexican" } },
    address: "Rr. Luan Haradinaj, Pristina",
    website: "https://eatmucho.com/",
    email: "info@eatmucho.com",
    phoneNumber: "+383 48 733 733",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1b/d0/9d/91/the-front-of-the-restaurant.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1b/d0/9f/ab/the-counter.jpg",
        },
      ],
    },
  },
  {
    name: `The Rooms Restaurant`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-p/1c/f1/30/30/7.jpg",
    description: "Vegetarian Friendly, Vegan Options, Gluten Free Options",
    location: "Albania",
    category: { connect: { name: "European" } },
    address: "Rruga Sami Frasheri 100 Meters From Wilson Square, Tirana",
    website: "https://therooms-restaurant.com/",
    email: "rooms@gmail.com",
    phoneNumber: "+355 69 330 0030",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-p/1c/f1/30/30/7.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/f1/30/51/23.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1c/f1/30/2e/5.jpg",
        },
      ],
    },
  },
  {
    name: `Otium Restaurant`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/1a/13/1f/7c/gastronomy-is-that-kind.jpg",
    description: "Vegetarian Friendly, Vegan Options, Gluten Free Options",
    location: "Albania",
    category: { connect: { name: "European" } },
    address: "Rruga Brigada E VIII, Tirana",
    website: "https://www.facebook.com/Otium-Restaurant-182686481817467/",
    email: "otium@gmail.com",
    phoneNumber: "+355 4 222 3570",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1a/13/1f/7c/gastronomy-is-that-kind.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-p/1a/32/fa/3f/ne-ne-otium-i-kushtojme.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/1a/16/28/e5/fileto-levreku-e-marinuar.jpg",
        },
      ],
    },
  },
  {
    name: `Tartuf Shop Restaurant`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-p/1c/38/dc/1c/truffle-home.jpg",
    description:
      "First Truffle Company in Albania, Restaurant, Distribution of Fresh Truffle and Truffle Products. Also find our products on Spar Albania.",
    location: "Albania",
    category: { connect: { name: "Italian" } },
    address: "Kalaja Tiranes, Tirana",
    website: "https://www.facebook.com/tartufshop/",
    email: "tartuf@gmail.com",
    phoneNumber: "+355 69 703 7711",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-p/1c/38/dc/1c/truffle-home.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/92/02/fb/truffle-carbonara.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/20/d2/0f/fish.jpg",
        },
      ],
    },
  },
  {
    name: `Eatalian's`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/0e/d6/a5/43/photo3jpg.jpg",
    description:
      "Italian cuisine combined with albanian hospitality. Our menu offers a variety of italian dishes with affordable prices. You are welcome to visit us.",
    location: "Albania",
    category: { connect: { name: "Italian" } },
    address: "Rruga Pjeter Bogdani, Tirana",
    website: "https://www.facebook.com/eatalians.tirana/",
    email: "eatalian@gmail.com",
    phoneNumber: "+355 68 394 1101",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/0e/d6/a5/43/photo3jpg.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/1d/3f/52/6f/gricia.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/1d/3f/52/19/eatalian-s-salad.jpg",
        },
      ],
    },
  },
  {
    name: `Serendiville`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/0c/f0/48/55/serendiville-little-mexico.jpg",
    description: "Vegetarian Friendly, Vegan Options, Gluten Free Options",
    location: "Albania",
    category: { connect: { name: "Mexican" } },
    address: "Liman Kaba, 30, Serendiville Villa Nr. 30, Tirana",
    website: "http://www.serendipity.al/",
    email: "serendiville@gmail.com",
    phoneNumber: "+355 68 609 3333",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/0c/f0/48/55/serendiville-little-mexico.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/0f/60/e4/77/if-you-re-craving-for.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/11/d9/3c/14/tuna-steak-christmas.jpg",
        },
      ],
    },
  },
  {
    name: `Serendipity the Mexican`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-o/0a/41/76/4a/serendipity-the-mexican.jpg",
    description: "Vegetarian Friendly",
    location: "Albania",
    category: { connect: { name: "Mexican" } },
    address: "Rruga Ibrahim Rugova, Tirana",
    website:
      "http://ww25.serendipitytirana.com/?subid1=20220322-0230-357f-8de6-31f8585ee12e",
    email: "serendipity@gmail.com",
    phoneNumber: "+355 68 902 8029",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-o/0a/41/76/4a/serendipity-the-mexican.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/09/00/f2/e0/serendipity-the-mexican.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/08/c8/23/61/serendipity-the-mexican.jpg",
        },
      ],
    },
  },
  {
    name: `Capitol Meat&Chicken`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/22/13/d7/9b/capitol-shop-view.jpg",
    description: "Lunch, Breakfast, Dinner, Drinks",
    location: "Albania",
    category: { connect: { name: "Turkish" } },
    address: "Rruga Kavaje Numer 1 3, Tirana",
    website: "https://www.capitol.al/",
    email: "capitol@gmail.com",
    phoneNumber: "+355 69 600 2500",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/22/13/d7/9b/capitol-shop-view.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/22/13/d3/5a/beef-grill.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/22/13/d7/c8/clean-cooking.jpg",
        },
      ],
    },
  },
  {
    name: `Sofra Turke`,
    thumnail:
      "https://media-cdn.tripadvisor.com/media/photo-s/18/94/8b/f0/kunefe-traditional-dessert.jpg",
    description: "Lunch, Breakfast, Dinner",
    location: "Albania",
    category: { connect: { name: "Turkish" } },
    address: "Kavaja St Nr. 169, Tirana",
    website: "https://sofraturke.wordpress.com/",
    email: "sofra@gmail.com",
    phoneNumber: "+355 4 222 6818",
    photos: {
      create: [
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-s/18/94/8b/f0/kunefe-traditional-dessert.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-f/18/94/62/6c/sutlac-turkish-traditional.jpg",
        },
        {
          image:
            "https://media-cdn.tripadvisor.com/media/photo-p/11/21/7b/38/sofra-turke.jpg",
        },
      ],
    },
  },
];
const users: Prisma.UserCreateInput[] = [
  {
    fullName: "Besim Sokoli",
    email: "besim@gmail.com",
    password: bcrypt.hashSync("besim"),
    phoneNumber: "+38349206105",
    reservations: {
      create: [
        {
          dateAndTime: "2022-03-20T18:30",
          persons: 6,
          restaurant: { connect: { name: `Izi's Apartment197` } },
        },
        {
          dateAndTime: "2022-02-10T20:25",
          persons: 3,
          restaurant: { connect: { name: `Ginnis Pizzeria` } },
        },
      ],
    },
    favoriteRestaurants: {
      create: [
        { restaurant: { connect: { name: `Eatalian's` } } },
        {
          restaurant: { connect: { name: "Tartuf Shop Restaurant" } },
        },
      ],
    },
  },
  {
    fullName: "Nicolas Marcora",
    email: "nicolas@gmail.com",
    password: bcrypt.hashSync("nicolas"),
    phoneNumber: "+38349300400",
    reservations: {
      create: [
        {
          dateAndTime: "2022-02-14T18:00",
          persons: 5,
          restaurant: { connect: { name: `Gagi Restaurant` } },
        },
        {
          dateAndTime: "2021-10-10T20:30",
          persons: 7,
          restaurant: { connect: { name: `Serendiville` } },
        },
      ],
    },
    favoriteRestaurants: {
      create: [
        { restaurant: { connect: { name: `Ginnis Pizzeria` } } },
        {
          restaurant: { connect: { name: "Izi's Apartment197" } },
        },
      ],
    },
  },
  {
    fullName: "Ed Putans",
    email: "ed@gmail.com",
    password: bcrypt.hashSync("ed"),
    phoneNumber: "+38349200300",
    reservations: {
      create: [
        {
          dateAndTime: "2020-08-02T17:30",
          persons: 2,
          restaurant: { connect: { name: `Sofra Turke` } },
        },
        {
          dateAndTime: "2022-01-02T17:25",
          persons: 4,
          restaurant: { connect: { name: `Capitol Meat&Chicken` } },
        },
      ],
    },
    favoriteRestaurants: {
      create: [
        { restaurant: { connect: { name: `Liburnia Restaurant` } } },
        {
          restaurant: { connect: { name: "Serendiville" } },
        },
      ],
    },
  },
  {
    fullName: "Artiola Caka",
    email: "artiola@gmail.com",
    password: bcrypt.hashSync("artiola"),
    phoneNumber: "+38349100200",
    reservations: {
      create: [
        {
          dateAndTime: "2021-02-14T17:40",
          persons: 4,
          restaurant: { connect: { name: `Serendipity the Mexican` } },
        },
        {
          dateAndTime: "2022-01-25T19:50",
          persons: 4,
          restaurant: { connect: { name: `Eatalian's` } },
        },
      ],
    },
    favoriteRestaurants: {
      create: [
        { restaurant: { connect: { name: `Otium Restaurant` } } },
        {
          restaurant: { connect: { name: "The Rooms Restaurant" } },
        },
      ],
    },
  },
];

async function createStuff() {
  for (const category of categories) {
    await prisma.category.create({ data: category });
  }
  for (const restaurant of restaurants) {
    await prisma.restaurant.create({ data: restaurant });
  }
  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
createStuff();
