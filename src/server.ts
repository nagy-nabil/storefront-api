import express from 'express';
import morgan from 'morgan';
const app = express();
// general middlewared
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
//end points [controllers/routers]
app.get('/', (_req: express.Request, res: express.Response) => {
    res.send(`we're in the store !`);
});
export default app;
