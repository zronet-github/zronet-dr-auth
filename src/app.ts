import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // Make sure express allows connection through Ingress proxy for SSL
app.use(json());
app.use(
	cookieSession({
		signed: false, // Change to enable encryption in cookies
		secure: process.env.NODE_ENV != 'test'  // Use only over https connection (set to false for testing)
	})
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(signinRouter);

app.all('*', async (req, res, next) => {
	throw new NotFoundError();
});

app.use(errorHandler);

export { app };
