import express from "express" 
import fs from "fs" 
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import uniqid from "uniqid" 

const reviewsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const reviewsJSON = join(parentFolderPath, "../../data/reviews.json")



reviewsRouter.get("/", (req, res) =>{
    console.log(reviewsJSON)
})


export default reviewsRouter