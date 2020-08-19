import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [validator.isEmail, 'Invalid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
    },
    planId: { type: Schema.Types.ObjectId, ref: 'Plan' },
  }, {
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);
export default User;
