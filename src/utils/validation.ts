import { User } from '../models/User'
import { Account } from '../models/Account'
import { Transaction } from '../models/Transaction'

export function validateUser(user: User) {
  let errors: Array<string> = []
  let emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const { first_name, last_name, email, user_password } = user

  if (first_name === null || first_name === undefined || first_name.trim().length <= 0) {
    errors.push(`Field first_name can't be empty`)
  }

  if (last_name === null || last_name === undefined || last_name.trim().length <= 0) {
    errors.push(`Field last_name can't be empty`)
  }

  if (user_password === null || user_password === undefined || user_password.length < 6) {
    errors.push(`Field user_password should be at least 6 characters long`)
  }

  if (email === null || email === undefined || email.trim().length <= 0) {
    errors.push(`Field email can't be empty`)
  } else if(!emailRegex.test(email)) {
    errors.push(`Field email is not valid`)
  }

  return errors
}

export function validateAccount(account: Account) {
  let errors: Array<string> = []
  const { account_name, currency, user_id } = account

  if (account_name === null || account_name === undefined || account_name.trim().length <= 0) {
    errors.push(`Field account_name can't be empty`)
  }

  if (currency === null || currency === undefined || currency.trim().length <= 0) {
    errors.push(`Field currency can't be empty`)
  }

  if (user_id === null || user_id === undefined) {
    errors.push(`Field user_id can't be empty`)
  }

  return errors
}

export function validateTransaction(transaction: Transaction) { 
  let errors: Array<string> = []
  const { transaction_description, amount, is_income, account_id } = transaction

  if (transaction_description === null || transaction_description === undefined || transaction_description.trim().length <= 0) {
    errors.push(`Field transaction_description can't be empty`)
  }

  if (amount === null || amount === undefined) {
    errors.push(`Field amount can't be empty`)
  }

  if (is_income === null || is_income === undefined) {
    errors.push(`Field is_income can't be empty`)
  }

  if (account_id === null || account_id === undefined) {
    errors.push(`Field account_id can't be empty`)
  }

  return errors
}

export function validatePassword(password: string, oldPassword: string) {
  let errors: Array<string> = []

  if (password === null || password === undefined || password.length < 6) {
    errors.push(`Field user_password should be at least 6 characters long`)
  }

  if (oldPassword === null || oldPassword === undefined || oldPassword.length < 6) {
    errors.push(`Field old_password should be at least 6 characters long`)
  }

  return errors
}