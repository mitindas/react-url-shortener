const express   = require("express");
const mongoose  = require("mongoose");
const cors      = require("cors");
const URL       = require("./models/Schema");

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

// Dynamic import function for nanoid
async function createShortId() {
  const { nanoid } = await import('nanoid');
  return nanoid(7);
}

app.post("/", async (req, res) => {
  await connect();
  const shortUrl = await createShortId(); // Use dynamic import
  const doc = await URL.create({ long_url: req.body.longUrl, short_url: shortUrl });
  res.send(process.env.APP_URL + doc.short_url);
});

app.get("/:id", async (req, res) => {
  await connect();
  const doc = await URL.findOne({ short_url: req.params.id });
  doc ? res.redirect(doc.long_url) : res.sendStatus(404);
});

module.exports = app;
