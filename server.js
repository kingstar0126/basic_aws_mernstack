import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
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

// app.use(cors({credentials: true, allowedHeaders: ['Content-Type', 'Authorization', 'Accept'] }));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client', 'build')));

/* const allowedOrigins = ['http://localhost:3000']
app.use(cors({
  origin: function(origin, callback) {
    if(!origin) return callback(null, true)
    if(allowedOrigins.indexOf(origin) === -1)
      {
        var msg = `The CORS policy for this site does not allow access from the specified Origin.`
        return callback(new Error(msg), false);
      }
    return callback(null, true);
  }
 })); */

app.use('/', router);
app.use('/api/auth', router);
app.use('/api/menu', router);
app.use('/api/plans', router);
app.use('/api/users', router);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
