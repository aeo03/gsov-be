import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors()); //and this
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Server is ready');
});
app.listen(port, () => {
    console.log(`Server starting at ${port}`);
});
