import { IUser } from './user.interfaces';

export const usersDraft = (wrap?: Partial<IUser>): IUser[] => [
  {
    id: wrap?.id || 'some_id',
    name: wrap?.name || 'Name Person',
    email: wrap?.email || 'mockeduser@example.com',
    password:
      wrap?.password ||
      '$2a$08$LUwtKU4tFdkX8DW5QIua7Ojcq35LKlXw11yXuGkPp3yo4gLgphjMy', // pass: example
    createdAt: new Date(),
  },
];
