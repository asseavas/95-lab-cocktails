export interface Ingredient {
  name: string;
  amount: string;
}

export interface Cocktail {
  _id: string;
  user: string;
  name: string;
  image: string;
  recipe: string;
  ingredients: Ingredient[];
  isPublished: boolean;
}

export interface CocktailMutation {
  name: string;
  image: File | '';
  recipe: string;
  ingredients: Ingredient[];
}

export interface RegisterMutation {
  username: string;
  displayName: string;
  avatar: File | '';
  password: string;
  confirmPassword: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
