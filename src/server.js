import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import reviewsRouter from './services/reviews/reviews.js';
import productsRouter from './services/products/products.js';
import { join } from "path"

const server = express();

const publicFolderPath = join(process.cwd(), "./public")

server.use(express.static(publicFolderPath))
server.use(express.json());
server.use(cors());

server.use('/products', productsRouter);
server.use('/reviews', reviewsRouter);

const port = 3001;

console.table(listEndpoints(server));

server.listen(port);
