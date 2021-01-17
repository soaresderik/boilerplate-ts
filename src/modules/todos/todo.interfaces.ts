import { IUser } from '@modules/users/user.interfaces';

export interface ITodo {
  id: string;
  description: string;
  done: boolean;
}

export interface ICreateToDoDTO {
  description: string;
  user: IUser;
}
