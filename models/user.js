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
    planInstance: { type: Schema.Types.ObjectId, ref: 'PlanInstance' },
    address: String,
    city: String,
    state: String,
    zip: Number,
    phone: {
      type: String,
      validate: (phone) => (
        validator.isMobilePhone(phone, 'en-US')
      ),
    },
  }, {
    timestamps: true,
  },
);

const User = mongoose.model('User', UserSchema);
export default User;
