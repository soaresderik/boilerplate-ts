import { IUser } from './user.interfaces';

export const mockedUser: IUser[] = [
  {
    id: 'mockeduser',
    email: 'mockeduser@example.com',
    password: '$2a$08$LUwtKU4tFdkX8DW5QIua7Ojcq35LKlXw11yXuGkPp3yo4gLgphjMy', // pass: example
    createdAt: new Date(),
  },
];
