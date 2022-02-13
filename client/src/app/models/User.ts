export interface User {
  id: number;
  username: string;
  age: number;
  cep: string;
  street: string;
  number?: number;
}
export interface UserResponse {
  message: string;
  data: User[];
}
