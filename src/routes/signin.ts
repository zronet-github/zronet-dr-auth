import express, { Request, Response } from 'express'; // import types to annotate req, res
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password').trim().notEmpty().withMessage('You must supply a valid password')
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			throw new BadRequestError('Invalid credentials');
		}

		const passwordMatch = await Password.compare(existingUser.password, password);

		if (!passwordMatch) {
			throw new BadRequestError('Invalid password');
		}

		// User's password is correct so generate JWT

		// Generate JWT

		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email
			},
			process.env.JWT_KEY!
		);

		// Store JWT in session object
		req.session = {
			jwt: userJwt
		};

		res.status(200).send(existingUser); // Send 200 instead of 201 because no new database record is being created
	}
);

export { router as signinRouter };
