export interface User {
  id: number;
  username: string;
  type:string;
  profileImageURL:string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}