import { IGNORE_WHITESPACE } from './options'
import { body, param } from 'express-validator'

export const accountValidate = [
  body('currency').isString().notEmpty(IGNORE_WHITESPACE),
  body('account_name').isString().notEmpty(IGNORE_WHITESPACE)
]

export const updateAccountValidate = [
  param('id').isInt(),
  body('currency').isString().notEmpty(IGNORE_WHITESPACE),
  body('account_name').isString().notEmpty(IGNORE_WHITESPACE)
]

export const deleteAccountValidate = [
  param('id').isInt(),
  body('user_password').isString(),
]