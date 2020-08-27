import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY ENV must be defined');
	}
	try {
		console.log('Attempting to connect to Database...');
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});
	} catch (err) {
		console.error(err);
	}
	app.listen(3000, () => {
		console.log('Listening on Port 3000 Baby!!!...');
	});
};
start();
