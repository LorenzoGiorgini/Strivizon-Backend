import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import uniqid from 'uniqid';
import multer from 'multer';
import { extname } from 'path';
import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';

const { readJSON, writeJSON, writeFile } = fs;

const productsRouter = express.Router();

const dataFolder = join(
	dirname(fileURLToPath(import.meta.url)),
	'../../data/products.json',
);

const allProducts = () => readJSON(dataFolder);
const writeProducts = (product) => writeJSON(dataFolder, product);
productsRouter.get('/', async (req, res, next) => {
	try {
		const products = await allProducts();
		res.send(products);
	} catch (error) {
		next(error);
	}
});

productsRouter.get('/:_id', async (req, res, next) => {
	try {
		const products = await allProducts();
		const singleProduct = products.filter((pro) => pro._id === req.params._id);
		res.send(singleProduct);
	} catch (error) {
		next(error);
	}
});

productsRouter.delete('/:_id', async (req, res, next) => {
	try {
		const products = await allProducts();
		const deletedProduct = products.filter((pro) => pro._id !== req.params._id);
		console.log('lol');
		await writeProducts(deletedProduct);
		res.status(204).send();
	} catch (error) {
		next(error);
	}
});

productsRouter.post('/', async (req, res, next) => {
	try {
		const createdProduct = {
			_id: uniqid(),
			...req.body,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const products = await fs.readJSON(dataFolder);

		products.push(createdProduct);

		await fs.writeJSON(dataFolder, products);

		res.status(201).send(createdProduct);
	} catch (error) {
		next(error);
	}
});

productsRouter.put('/:productId', async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
});

export default productsRouter;
