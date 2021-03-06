import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes properties
// required to create new user

interface UserAttrs {
	email: string;
	password: string;
}

// An interface that describes the properties
// that a user model has

interface UserModel extends mongoose.Model<UserDoc> {
	build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
//that a user document has

interface UserDoc extends mongoose.Document {
	email: string;
  password: string;
  username: string;
  countryCode: string;
  userRole: string;
  status: string;
  telno: string;
  
}

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
    },
    username: {
      type: String,
      required: true
    },
    countryCode: {
      type: String,
      required: false
    },
    userRole: {
    type: String,
    required: true
    },
    status: {
      type: String,
      required: true
    },
    telno: {
      type: String,
      required: false
    }
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password; // remove password property from MongoDB response
				delete ret.__v;
			}
		}
	}
);

userSchema.pre('save', async function(done) {
	// Only hash password only if it's modified
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
