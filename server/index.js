import express from 'express';
import mongoose from 'mongoose';
import config from 'config';

const authRouter = require("./routes/auth.routes");
const app = express();
const PORT = config.get('port');
const DB_URL = config.get('db-uri');

app.use(express.json());
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