import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

//CONNECTION_URL = 'mongodb://mongodb:e43FQweegr6RS6rP@mongodb-xin2-rx02-production/memories-mongo';

//const CONNECTION_URL = 'mongodb://mongodb:e43FQweegr6RS6rP@mongodb-xin2-rx02-production:27017/memories-mongo';
const CONNECTION_URL = 'mongodb+srv://kmanikon:Zamn123@cluster0.gbejc2u.mongodb.net/?retryWrites=true&w=majority';

//const CONNECTION_URL = 'mongodb://mongodb:e43FQweegr6RS6rP@mongodb-xin2-rx02-production:27017/memories-mongo';

const PORT = 5030;//process.env.PORT || 5000;

// init DB connection
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

