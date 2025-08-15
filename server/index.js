const express   = require("express");
const mongoose  = require("mongoose");
const cors      = require("cors");
const URL       = require("./models/Schema");

require("dotenv").config();

const app = express();

app.use(cors({ origin: ["https://react-url-xi.vercel.app", "http://localhost:3000"] }));
app.use(express.json());

let cached = null;
const connect = () =>
  cached || (cached = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }));

async function createShortId() {
  const { nanoid } = await import('nanoid');
  return nanoid(7);
}

//POST

app.post("/", async (req, res) => {
  await connect();
  const shortUrl = createShortId(); 
  const newUrl = new URLSchema({
		long_url: longUrl,
		short_url: shortUrl
	});
	await newUrl.save();
	res.send(process.env.APP_URL + newUrl.short_url);
});

//GET?

app.get("/:id", async (req, res) => {
  await connect();
  const {id} = req.params;
	const url = await URLSchema.findOne({short_url: id});
	if (url) {
		res.redirect(url.long_url);
	} else {
		res.status(404).send("URL not found");
	}
});

module.exports = app;
