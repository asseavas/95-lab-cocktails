import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('cocktails');
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [user] = await User.create(
    {
      username: 'user@gmail.local',
      password: '1nkn$jb',
      confirmPassword: '1nkn$jb',
      role: 'user',
      displayName: 'User',
      avatar: 'fixtures/user-avatar.jpeg',
      token: crypto.randomUUID(),
    },
    {
      username: 'admin@gmail.local',
      password: 'ved67#slm',
      confirmPassword: 'ved67#slm',
      role: 'admin',
      displayName: 'Admin',
      avatar: 'fixtures/admin-avatar.jpeg',
      token: crypto.randomUUID(),
    },
  );

  await Cocktail.create(
    {
      user: user,
      name: 'Margarita',
      image: 'fixtures/margarita.jpeg',
      recipe:
        'Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.',
      ingredients: [
        {
          name: 'Tequila',
          amount: '1/2 ml',
        },
        {
          name: 'Triple sec',
          amount: '1/2 ml',
        },
        {
          name: 'Lime juice',
          amount: '25 ml',
        },
        {
          name: 'Salt',
          amount: 'pinch',
        },
      ],
      isPublished: true,
    },
    {
      user: user,
      name: 'Bloody Mary',
      image: 'fixtures/bloody-mary.jpg',
      recipe: 'Stirring gently, pour all ingredients into highball glass. Garnish.',
      ingredients: [
        {
          name: 'Vodka',
          amount: '1/2 ml',
        },
        {
          name: 'Tomato juice',
          amount: '3 ml',
        },
        {
          name: 'Lemon juice',
          amount: '1 dash',
        },
        {
          name: 'Worcestershire sauce',
          amount: '1/2 tsp',
        },
        {
          name: 'Tabasco sauce',
          amount: '2-3 drops',
        },
        {
          name: 'Lime',
          amount: '1 wedge',
        },
      ],
      isPublished: true,
    },
    {
      user: user,
      name: 'Strawberry Shivers',
      image: 'fixtures/strawberry-shivers.jpg',
      recipe:
        'Place all ingredients in the blender jar - cover and whiz on medium speed until well blended. Pour in one tall, 2 medium or 3 small glasses and drink up.',
      ingredients: [
        {
          name: 'Strawberries',
          amount: '1/2 cup',
        },
        {
          name: 'Honey',
          amount: '4 tsp',
        },
        {
          name: 'Water',
          amount: '1/2 cup',
        },
      ],
      isPublished: false,
    },
  );

  await db.close();
};

run().catch(console.error);
