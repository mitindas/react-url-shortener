const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { nanoid } = require("nanoid");
const URLSchema = require("./models/Schema");

const app = express();

app.use(cors(
    {
        origin: ["https://react-url-xi.vercel.app/","localhost:3000"],
        methods: ["POST", "GET"],
    }
));app.use(express.json());
app.use(express.urlencoded({extended: true}))

dotenv.config();
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
};


//POST

app.post("/", async (req, res) => {
	connect();
	const { longUrl } = req.body;
	const shortUrl = nanoid(7);
	const newUrl = new URLSchema({
		long_url: longUrl,
		short_url: shortUrl
	});
	await newUrl.save();
	res.send(process.env.APP_URL + newUrl.short_url);
});

//GET

app.get("/:id", async (req, res) => {
	connect();
	const {id} = req.params;
	const url = await URLSchema.findOne({short_url: id});
	if (url) {
		res.redirect(url.long_url);
	} else {
		res.status(404).send("URL not found");
	}
});

const PORT = process.env.PORT || 5000;

// app.listen(port, () => {
// 	connect();
// 	console.log("\n\n Server on http://localhost:5000/");
// })