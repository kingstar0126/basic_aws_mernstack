import mongoose from 'mongoose';

const { Schema } = mongoose;
const RecipeSchema = new Schema(
  {
    title: { type: String, required: [true, 'Recipe title is required'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    stars: { type: Number, default: 0 },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
    ingredients: [String],
    steps: [String],
    images: [String],
    duration: Number,
  }, {
    timestamps: true,
  },
);

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;
