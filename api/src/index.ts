import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { errorHandler } from './app/helpers/ErrorHandler';
import routes from './routes';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://192.168.3.5:5173'
  ]
}
));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🔥 Server started on http://localhost:${port}`);
});
