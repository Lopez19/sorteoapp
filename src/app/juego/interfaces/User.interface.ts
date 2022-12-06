export interface User {
  saldo?: number;
  _id?: string;
  username?: string;
  name?: string;
  email?: string;
  password?: string;
  DNI?: string;
  phone?: string;
  address?: string;
  roles?: Role[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  _id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}
