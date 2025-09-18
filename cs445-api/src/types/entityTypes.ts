import { IObject } from ".";

export interface IDoc {
  createdById: any;
  createdAt: Date;
  deletedById?: any;
  deletedAt?: Date;
  updatedAt?: Date;
  updatedById?: any;
}

export interface IProductDoc extends IDoc {
  name: string;
  image: string;
  price: string;
}
export interface IUserDoc extends IDoc {
  email: string;
  role: string;
  password: string;
  phone: string;
  status: string;
  avatar: string;
  full_name: string;
}
