// Hash password and compare password function

import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
	static async toHash(password: string) {
		const salt = randomBytes(8).toString('hex');
		const buf = (await scryptAsync(password, salt, 64)) as Buffer;

		// join hashed password and salt before return

		return `${buf.toString('hex')}.${salt}`;
	}

	// static methods so that they can be called without instantiating the class

	static async compare(storedPassword: string, suppliedPassword: string) {
		// separate hashed password and salt
		const [ hashedPassword, salt ] = storedPassword.split('.');

		const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

		return buf.toString('hex') === hashedPassword;
	}
}
