import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import express from "express";
import uniqid from "uniqid";
import multer from "multer";
import { extname } from "path";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

const dataFolder = join(dirname(fileURLToPath(import.meta.url)), "../../data")


const productsRouter = express.Router()


productsRouter.get()


productsRouter.delete()


productsRouter.post()


productsRouter.put()



export default productsRouter