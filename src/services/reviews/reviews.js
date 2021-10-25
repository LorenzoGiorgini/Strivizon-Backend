import express from "express" 
import fs, { fdatasync } from "fs" 
import { fileURLToPath } from "url" 
import { dirname, join } from "path" 
import uniqid from "uniqid" 



import expressValidator from "express-validator"
const {validationResult} = expressValidator


const reviewsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const reviewsJSON = join(parentFolderPath, "../../data/reviews.json")
const productsJSON = join(parentFolderPath, "../.../data/products.json")




reviewsRouter.post("/:id", (req, res) =>{
    console.log(productsJSON)

   const index = 1
    if(index === -1){
        res
          .status(404)
          .send({ message: `invalid ${req.params.id}` });

    }else{
        const newReview = {
            ...req.body,
            _id: uniqid(),
            createdAt: new Date()

        }

        const reviews = JSON.parse(fs.readFileSync(reviewsJSON))
        reviews.push(newReview)
    
        fs.writeFileSync(reviewsJSON, JSON.stringify(reviews))
        res.status(201).send({created: newReview.createdAt})
        
    }


})

reviewsRouter.put("/:id", (req, res) =>{
    console.log(reviewsJSON)
})


reviewsRouter.get("/", (req, res) =>{
    console.log(reviewsJSON)
})

reviewsRouter.delete("/:id", (req, res) =>{
    console.log(reviewsJSON)
})

export default reviewsRouter