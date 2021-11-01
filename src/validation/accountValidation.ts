import { body, param } from 'express-validator'

export const accountValidate = [
  body('currency').trim().isLength({ min: 2 }),
  body('account_name').trim().isLength({ min: 2 })
]

export const updateAccountValidate = [
  param('id').isInt(),
  body('currency').trim().isLength({ min: 2 }),
  body('account_name').trim().isLength({ min: 2 })
]

export const deleteAccountValidate = [
  param('id').isInt(),
  body('user_password').isLength({ min: 6 }),
]