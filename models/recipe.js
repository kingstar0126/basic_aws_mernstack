import mongoose from 'mongoose';

const { Schema } = mongoose;
const RecipeSchema = new Schema(
  {
    title: String,
    ingredients: [String],
    instructions: [String],
    duration: Number,
    diet: { type: String, enum: ['Meat and veggies', 'veggies'] },
    servings: { type: Number, enum: [2, 4] },
  }, {
    timestamps: true,
  },
);

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;
