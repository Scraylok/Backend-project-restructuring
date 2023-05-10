import "dotenv/config.js";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassport from './config/passport.js'
import routerUser from "./routes/users.routes.js";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/cart.routes.js";
import routerSession from "./routes/session.routes.js";
import routerGithub from "./routes/github.routes.js";
import nodemailer from "nodemailer"



//Express execution
const app = express();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    
    store: MongoStore.create({
      mongoUrl: process.env.URLMONGODB,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 360,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true, 
    saveUninitialized: true,
  })
);

//MongoAtlas Connection
const mongooseConnection = async () => {
  await mongoose
    .connect(process.env.URLMONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));
};
mongooseConnection();

//Passport
app.use(passport.initialize());
initializePassport();
app.use(passport.session());

//Port Setting
app.set("port", process.env.PORT || 8080);

//Server run:
export const server = app.listen(app.get("port"), () => {
  console.log(`Server running on Port: ${app.get("port")}`);
});


//Routes
app.use('/user', routerUser)
app.use('/product', routerProduct)
app.use('/cart', routerCart)
app.use('/session', routerSession)
app.use('/github', routerGithub)

//Socket.io

export const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Client connect");

  socket.on("message", async newMessage => {
    await createMessage([newMessage])
    const messages = await readMessages();
    console.log(messages)
    socket.emit("allMessages", messages)
  })
  socket.on("load messages", async () => {
    const messages = await readMessages();
    console.log(messages)
    socket.emit("allMessages", messages)
  })

})
