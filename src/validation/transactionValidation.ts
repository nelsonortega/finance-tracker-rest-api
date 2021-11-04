import { IGNORE_WHITESPACE } from './options'
import { body, param } from 'express-validator'

export const createTransactionValidate = [
  body('transaction_description').isString().notEmpty(IGNORE_WHITESPACE),
  body('amount').isNumeric(),
  body('is_income').isBoolean(),
  body('account_id').isInt()
]

export const transactionValidate = [
  param('id').isInt()
]