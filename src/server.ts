import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import userRoutes from './routes/userRoutes';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));

server.use(session({
    genid: function(req) {
        return '1234' // use UUIDs for session IDs
    },
    secret: process.env.SECRET_KEY as string,
    saveUninitialized: true,
    resave: false,
}));


server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(userRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.render('pages/404');
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.log(err);
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
});