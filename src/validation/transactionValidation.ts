import { body, param } from 'express-validator'

export const createTransactionValidate = [
  body('transaction_description').isLength({ min: 2 }),
  body('amount').trim().isNumeric(),
  body('is_income').isBoolean(),
  body('account_id').trim().isInt()
]

export const transactionValidate = [
  param('id').isInt()
]