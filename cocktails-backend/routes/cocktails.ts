import express from 'express';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Cocktail from '../models/Cocktail';
import parseIngredients from '../helpers/parseIngredients';

const cocktailsRouter = express.Router();

cocktailsRouter.get('/', async (req, res, next) => {
  try {
    const cocktails = await Cocktail.find();
    return res.send(cocktails);
  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.get('/user', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const userCocktails = await Cocktail.find({ user: req.user._id });

    return res.send(userCocktails);
  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.get('/:id', async (req, res, next) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);

    if (cocktail === null) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }

    return res.send(cocktail);
  } catch (error) {
    return next(error);
  }
});

cocktailsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const ingredients = parseIngredients(req.body.ingredients);

    const cocktail = await Cocktail.create({
      user: req.user?._id,
      name: req.body.name,
      image: req.file?.filename,
      recipe: req.body.recipe,
      ingredients,
    });

    return res.send(cocktail);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

cocktailsRouter.delete('/:id', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid cocktail ID' });
    }

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const cocktail = await Cocktail.findById(id);

    if (!cocktail) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }

    await Cocktail.findByIdAndDelete(id);

    return res.send({ message: 'Cocktail deleted successfully' });
  } catch (error) {
    next(error);
  }
});

cocktailsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req: RequestWithUser, res, next) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const cocktail = await Cocktail.findById(id);

    if (!cocktail) {
      return res.status(404).send({ error: 'Cocktail not found' });
    }

    cocktail.isPublished = !cocktail.isPublished;

    await cocktail.save();

    return res.send({ message: `Cocktail's isPublished status updated to ${cocktail.isPublished}` });
  } catch (error) {
    next(error);
  }
});

export default cocktailsRouter;
