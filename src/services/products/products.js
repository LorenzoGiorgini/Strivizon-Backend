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

productsRouter.get('/', async (req, res, next) => {
	try {
		const products = await allProducts();
		res.send(products);
	} catch (error) {
		next(error);
	}
});
productsRouter.get('/:id', async (req, res, next) => {
	try {
		const products = await allProducts();
		const singleProduct = products.filter((pro) => pro.id === req.params.id);
		res.send(singleProduct);
	} catch (error) {
		next(error);
	}
});

productsRouter.delete('/:id', async (req, res, next) => {
	try {
		const products = await allProducts();
		const deletedProduct = products.filter((pro) => pro.id !== req.params.id);
		res.send(deletedProduct);
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

		const products = await allProducts();

		products.push(createdProduct);

		await fs.writeJSON(dataFolder, products);

		res.status(201).send(createdProduct);
	} catch (error) {
		next(error);
	}
});

productsRouter.put('/:productId', async (req, res, next) => {
	try {

        const products = await allProducts();

        const productIndex = products.findIndex(product => product._id === req.params.productId)

        const updatedProduct = {
            ...products[productIndex],
            ...req.body,
            updatedAt: new Date()
        }

        products[productIndex] = updatedProduct;

        await fs.writeJSON(dataFolder, products)

        res.status(200).send(updatedProduct)

	} catch (error) {
		next(error);
	}
});

export default productsRouter;