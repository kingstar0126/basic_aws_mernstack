import mongoose from 'mongoose';

const { Schema } = mongoose;

const TagsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
});

const Tags = mongoose.model('Tags', TagsSchema);
export default Tags;
