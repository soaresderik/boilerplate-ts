/* eslint-disable @typescript-eslint/interface-name-prefix */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      email: string;
      password?: string;
      createdAt?: Date;
      deletedAt?: Date;
    };
  }
}
