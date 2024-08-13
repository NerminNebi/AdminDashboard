export interface IUsers {
    data: IUser[],
    totalCount: number
}

export interface IUser {
    id: number
    firstName: string
    lastName: string
    email: string
    phone: string
    isActive: boolean
}