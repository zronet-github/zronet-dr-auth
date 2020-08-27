// checks to see who the current user is and whether they are login
// as react cannot examine the cookie directly
// if the cookie is set there'll be a req.session.jwt cookie set and
// it will return the payload containing Id and email of user
// if not then it will return null implying the user is not logged in

import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
	res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
