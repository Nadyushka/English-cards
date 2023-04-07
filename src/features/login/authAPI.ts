import axios from 'axios'

//types
export type LoginRequestType = {
  email: string
  password: string
  rememberMe: boolean
}

type RegisterRequestType = {
  email: string
  password: string
}
export type UserResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}
export type ChangeDataResponseType = {
  name?: string
  avatar?: string // url or base64
}

export type AuthResponseType = {
  info: string
  error: string
  updatedUser: UserResponseType
}

//instance
export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0/',
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:7542/2.0/'
  //   : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

//authAPI
export const authAPI = {
  login(data: LoginRequestType) {
    return instance.post<UserResponseType>('auth/login', data).then(res => res.data)
  },
  logout() {
    return instance.delete<AuthResponseType>('auth/me').then(res => res)
  },
  me() {
    return instance.post<UserResponseType>('auth/me', {}).then(res => res.data)
  },
  register(data: RegisterRequestType) {
    return instance.post<UserResponseType>('auth/register', data).then(res => res.data)
  },
  forgot(email: string) {
    let data = {
      email: email,
      from: 'test-front-admin <ai73a@yandex.by>',
      message: `<div style="background-color: lime; padding: 15px"> password recovery link:  
                <a href='http://localhost:3000/#/set-new-password/$token$'>link</a>
                </div>`,
    }

    return instance.post<UserResponseType>('/auth/forgot', data).then(res => res.data)
  },
  setNewPasswordRequest(password: string, resetPasswordToken: string) {
    let data = { password, resetPasswordToken }

    return instance.post<UserResponseType>('/auth/set-new-password', data).then(res => res.data)
  },
  changeData(data: ChangeDataResponseType) {
    return instance.put<AuthResponseType>('/auth/me', data).then(res => res)
  },
}
