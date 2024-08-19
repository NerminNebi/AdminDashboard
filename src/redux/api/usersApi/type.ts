export interface IFilter{
    skip: number,
    take: number,
    sortField: string,
    orderBy: boolean
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

export interface IStatusParams{
    id: number,
    isActive: boolean,
    skip: number,
    sortField: string,
    take: number,
    orderBy: boolean
}