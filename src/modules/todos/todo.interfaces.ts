import { IUser } from '@modules/users/user.interfaces';

export interface ITodoRepository {
  list: (user: IUser) => Promise<ITodo[]>;
  create: (params: ICreateToDoDTO) => Promise<ITodo>;
}

export interface ITodo {
  id: string;
  description: string;
  done: boolean;
}

export interface ICreateToDoDTO {
  description: string;
  user: IUser;
}
