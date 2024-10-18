import mongoose, { Types } from 'mongoose';
import User from './User';
import { CocktailMutation } from '../types';

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const CocktailSchema = new mongoose.Schema<CocktailMutation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  ingredients: [IngredientSchema],
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

export default Cocktail;
