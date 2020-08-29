import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routes/index';

dotenv.config();

const database = process.env.DB;
const port = process.env.PORT;

mongoose.connect(database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.log('MongoDB connection error'));

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', router);
app.use('/api/auth', router);
app.use('/api/menu', router);
app.use('/api/plans', router);
app.use('/api/users', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
