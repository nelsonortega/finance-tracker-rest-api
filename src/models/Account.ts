export interface IAccount {
  account_id?: number
  account_name: string
  currency: string
  user_id: number
  created_at?: string
  updated_at?: string
}

export class Account {
  account_id: number
  account_name: string
  currency: string
  user_id: number
  created_at: string
  updated_at: string

  constructor(account: IAccount) {
    this.account_id = account.account_id || 0
    this.account_name = account.account_name
    this.currency = account.currency
    this.user_id = account.user_id
    this.created_at = account.created_at || ''
    this.updated_at = account.updated_at || ''
  }
}