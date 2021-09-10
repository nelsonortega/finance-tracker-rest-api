export interface ITransaction {
  transaction_id?: number
  transaction_description: string
  amount: number
  is_income: boolean
  account_id: number
  created_at?: string
}

export class Transaction {
  transaction_id: number
  transaction_description: string
  amount: number
  is_income: boolean
  account_id: number
  created_at: string

  constructor(transaction: ITransaction) {
    this.transaction_id = transaction.transaction_id || 0
    this.transaction_description = transaction.transaction_description
    this.amount = transaction.amount
    this.is_income = transaction.is_income
    this.account_id = transaction.account_id
    this.created_at = transaction.created_at || ''
  }
}