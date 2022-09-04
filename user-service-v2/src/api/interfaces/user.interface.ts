export interface User {
  id: number;

  // user information
  username: string;
  password: string;
  firstName: string;
  lastName: string;

  // timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
