import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
	namespace NodeJS {
		interface Global {
			signin(): Promise<string[]>;
		}
	}
}

let mongo: any;

beforeAll(async () => {
	// run before testing: setup database connection
	process.env.JWT_KEY = 'key8686';
	mongo = new MongoMemoryServer();
	const mongoUri = await mongo.getUri();
	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
});

beforeEach(async () => {
	// run before each test: delete all collections
	const collections = await mongoose.connection.db.collections();

	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	//stop mongo and close connection after all tests
	await mongo.stop();
	await mongoose.connection.close();
});

global.signin = async () => {
	// create global function instead of importing

	const email = 'test@test.com';
	const password = 'password';

	const response = await request(app)
		.post('api/users/signup')
		.send({
			email,
			password
		})
		.expect(201);

	const cookie = response.get('Set-Cookie');

	return cookie;
};
