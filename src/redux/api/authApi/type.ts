export interface ISendData {
    userName: string
    password: string
}

export interface IAuth{
    token: string,
    refreshToken: string,
    expiresAt: string,
  }