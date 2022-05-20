import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const run = async () => {
  const DB_URL = process.env.MONGO_URL;
  await mongoose.connect(`${DB_URL}`);
};

app.get('/', (req, res) => {
  res.send("Express app con db! :D");
});
app.use(express.json());
app.use("/api", routes);

run().then(result => 
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  })
).catch(err => console.log(err));

