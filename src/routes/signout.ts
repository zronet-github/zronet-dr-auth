import express from 'express';


const router = express.Router();

router.post('/api/users/signout', (req, res) => {

	if (req.session?.jwt) {
		req.session.jwt = null
		
	}

	res.send({})

});

export { router as signoutRouter };
