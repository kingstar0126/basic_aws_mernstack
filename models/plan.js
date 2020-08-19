import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlanSchema = new Schema(
  {
    name: String,
    diet: { type: String, enum: ['meat and vegetables', 'vegetables'] },
    recipesPerWeek: { type: Number, default: 2 },
    servings: { type: Number, enum: [2, 4] },
    pricePerServing: Number,
    menu: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  },
);

const Plan = mongoose.model('Plan', PlanSchema);
export default Plan;
