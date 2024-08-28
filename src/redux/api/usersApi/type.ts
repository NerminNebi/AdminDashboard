export interface IFilter {
  skip: number;
  take: number;
  sortField: string;
  orderBy: boolean;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface IUsers {
  data: IUser[];
  totalCount: number;
}

export interface IStatusParams {
  id: number;
  isActive: boolean;
}

export interface IDeleteUser {
  id: number;
}
[];

export interface IAddUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
