/* eslint-disable @typescript-eslint/interface-name-prefix */
import https from 'https';
import http from 'http';
import fs from 'fs';

import bodyParser from 'body-parser';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import methodOverride from 'method-override';

import swaggerDocument from './swagger/swagger.json';

// import './controllers/keys-controller';
import './controllers/auth-controller';
import './controllers/authentication-mode-controller';
import './controllers/config-controller';
import './controllers/test-controller';
import './controllers/cards-controller';
import './controllers/card-controller';
import './controllers/device-info-controller';
import './controllers/status-controller';
import './controllers/installer-status-controller';
import './controllers/charging-controller';
import './controllers/transactions-controller';
import './controllers/schedule.controller';
import './controllers/upgrade-controller';
import './controllers/development-controller';

import { RegisterRoutes } from './routes';

export const server = (): Promise<https.Server | http.Server> => {
  const app = express()
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json())
    .use(methodOverride())
    .use((_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        `Origin, X-Requested-With, Content-Type, Accept, Authorization`
      );
      next();
    });

  RegisterRoutes(app);

  interface IError {
    status?: number;
    fields?: string[];
    message?: string;
    name?: string;
  }

  app.use(
    (
      err: IError,
      _req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const status = err.status || 500;
      const body = {
        fields: err.fields || undefined,
        message: err.message || 'An error occurred during the request.',
        name: err.name,
        status
      };
      res.status(status).json(body);
      next();
    }
  );

  const options = {
    swaggerOptions: {
      validatorUrl: null
    }
  };

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );

  const port = 3000;

  return new Promise<https.Server | http.Server>(resolve => {
    const isProduction = process.env.NODE_ENV === 'production';
    const server = isProduction
      ? http.createServer(app)
      : https.createServer(
          {
            key: fs.readFileSync('./certs/server.key'),
            cert: fs.readFileSync('./certs/server.crt')
          },
          app
        );

    server.listen(3000, () => {
      /* eslint-disable-next-line */
      console.log(
        `✓ Started API server at ${
          isProduction ? 'http' : 'https'
        }://localhost:${port}`
      );
      resolve(server);
    });
  });
};
