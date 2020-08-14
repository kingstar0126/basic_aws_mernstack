import mongoose from 'mongoose';

const { Schema } = mongoose;
const ReviewSchema = new Schema(
  {
    stars: { type: Number, default: 0 },
    comment: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
  }, {
    timestamps: true,
  },
);

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
