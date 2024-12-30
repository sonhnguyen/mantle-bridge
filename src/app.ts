import dotenv from 'dotenv';
dotenv.config();

import bodyParser from 'body-parser';
import compression from 'compression';
import express, { Request, Response, NextFunction } from 'express';
import ApplicationError from './errors/application-error';
import logger from './logger';
import routes from './routes';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'development');

app.use(routes);

// Simplified error handling middleware
app.use(
  (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      logger.error('Error in request handler', { error: err });
    }

    res.status(err.status || 500).json({
      error: err,
      message: err.message,
      ...(isDevelopment && { stack: err.stack }),
    });
  }
);

export default app;
