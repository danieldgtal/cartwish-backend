const mongoose = require("mongoose");
const path = require("path");
// Load .env from this backend directory explicitly so the script works
// even when executed from the repo root (process.cwd() may differ).
require("dotenv").config({ path: path.join(__dirname, ".env") });

const Category = require("./models/category");
const Product = require("./models/products");
const data = require("./data.json");

async function restoreProducts() {
	if (!process.env.MONGO_URI) {
		console.error(
			"MONGO_URI is not set. Make sure backend/.env exists and defines MONGO_URI"
		);
		process.exit(1);
	}

	await mongoose.connect(process.env.MONGO_URI, {});

	await Category.deleteMany({});
	await Product.deleteMany({});

	for (let category of data) {
		const { _id: categoryId } = await new Category({
			name: category.name,
			image: category.image,
		}).save();
		const products = category.products.map((product) => ({
			...product,
			category: categoryId,
		}));
		await Product.insertMany(products);
	}

	mongoose.disconnect();

	console.info("Database Filled/Restored Successfully!!");
}

restoreProducts();
