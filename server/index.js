const express   = require("express");
const mongoose  = require("mongoose");
const { nanoid} = require("nanoid");
const cors      = require("cors");
const URL       = require("./models/Schema");

const favicon = require('serve-favicon');
const path = require('path');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


require("dotenv").config();

const app = express();

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(cors({ origin: ["https://react-url-xi.vercel.app", "http://localhost:3000"] }));
app.use(express.json());

let cached = null;
const connect = () =>
  cached || (cached = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }));

app.post("/", async (req, res) => {
  await connect();
  const doc = await URL.create({ long_url: req.body.longUrl, short_url: nanoid(7) });
  res.send(process.env.APP_URL + doc.short_url);
});

app.get("/:id", async (req, res) => {
  await connect();
  const doc = await URL.findOne({ short_url: req.params.id });
  doc ? res.redirect(doc.long_url) : res.sendStatus(404);
});

module.exports = app;
