export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
  deletedAt?: Date;
}

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
