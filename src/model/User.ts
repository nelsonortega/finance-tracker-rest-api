import bcryptjs from 'bcryptjs'

export interface IUser {
  user_id?: number
  first_name: string
  last_name: string
  email: string
  user_password: string
  created_at?: string
  updated_at?: string
}

export class User {
  user_id: number
  first_name: string
  last_name: string
  email: string
  user_password: string
  created_at: string
  updated_at: string

  constructor(user: IUser) {
    this.user_id = user.user_id || 0
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.email = user.email
    this.user_password = user.user_password
    this.created_at = user.created_at || ''
    this.updated_at = user.updated_at || ''
  }

  hashPassword() {
    const salt = bcryptjs.genSaltSync(10)
    this.user_password = bcryptjs.hashSync(this.user_password, salt)
  }

  checkPassword(password: string): boolean {
    return bcryptjs.compareSync(password, this.user_password)
  }
}