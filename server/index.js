import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import { authRouter } from './routes/auth.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = config.get('port');
const DB_URL = config.get('db-uri');

app.use(cors());
app.use(express.json());
app.use(cookieParser);
app.use('/api/auth', authRouter);

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