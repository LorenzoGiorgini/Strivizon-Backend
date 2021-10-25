import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import express from "express";
import uniqid from "uniqid";
import multer from "multer";
import { extname } from "path";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../../data/products.json")


const productsRouter = express.Router()


//productsRouter.get()


//productsRouter.delete()


productsRouter.post("/" , async (req, res , next) => {
    try {
        const createdProduct = {
            _id: uniqid(),
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const products = await fs.readJSON(dataFolder)
        
        products.push(createdProduct)

        await fs.writeJSON(dataFolder , products)

        res.status(201).send(createdProduct)

    } catch (error) {
        next(error);
    }
})


productsRouter.put("/:productId" , async(req , res , next) => {
    try {
        
        


    } catch (error) {
        next(error)
    }
})



export default productsRouter