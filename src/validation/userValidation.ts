import { body } from 'express-validator'
import { IGNORE_WHITESPACE } from './options'

export const createUserValidate = [
  body('first_name').isString().notEmpty(IGNORE_WHITESPACE),
  body('last_name').isString().notEmpty(IGNORE_WHITESPACE),
  body('email').isEmail(),
  body('user_password').isStrongPassword()
]

export const updateUserValidate = [
  body('first_name').isString().notEmpty(IGNORE_WHITESPACE),
  body('last_name').isString().notEmpty(IGNORE_WHITESPACE)
]

export const changeEmailValidate = [
  body('new_email').isEmail(),
  body('user_password').isString()
]

export const deleteUserValidate = [
  body('user_password').isString()
]