import winston from "winston";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import express from "express";

const port = process.env.PORT || 3900;
const app = express();

// Create session
app.use(
  session({
    // Used to compute a hash
    secret: process.env.SESSION_KEY!,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true } when using HTTPS
    // Store session on DB
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/test",
    }),
  })
);


// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());


app.listen(port, () => winston.info(`Listening on port ${port}...`));
