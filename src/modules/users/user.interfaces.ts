export interface IUser {
  id: string;
  email: string;
  password?: string;
  createdAt?: Date;
  deletedAt?: Date;
}

export interface ICreateUserDTO {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
