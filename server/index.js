import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { router } from './routes/routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/errorMiddleware.js'

const app = express();
const PORT = config.get('port');
const DB_URL = config.get('db-uri');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use('/api', router);
app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.status(200).json('Server is working23');
})

async function startApp(){
    try{
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {console.log(`Server has been started on ${PORT} port...`);});
    }catch(e){
        console.log(e.message);
    }
}

startApp();