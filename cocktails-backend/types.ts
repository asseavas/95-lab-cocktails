import { Model, Types } from 'mongoose';

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailMutation {
  user: Types.ObjectId;
  name: string;
  image: string;
  recipe: string;
  ingredients: Ingredient[];
  isPublished: boolean;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  googleID?: string;
  avatar: string;
  __confirmPassword: string;
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
