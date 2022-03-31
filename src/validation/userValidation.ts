import { body } from 'express-validator'
import { IGNORE_WHITESPACE } from './options'

export const createUserValidate = [
  body('first_name').isString().notEmpty(IGNORE_WHITESPACE).isLength({ max: 50 }),
  body('last_name').isString().notEmpty(IGNORE_WHITESPACE).isLength({ max: 50 }),
  body('email').isEmail().isLength({ max: 320 }),
  body('user_password').isStrongPassword().isLength({ max: 256 })
]

export const updateUserValidate = [
  body('first_name').isString().notEmpty(IGNORE_WHITESPACE).isLength({ max: 50 }),
  body('last_name').isString().notEmpty(IGNORE_WHITESPACE).isLength({ max: 50 })
]

export const changeEmailValidate = [
  body('new_email').isEmail().isLength({ max: 320 }),
  body('user_password').isString().isLength({ max: 256 })
]

export const deleteUserValidate = [
  body('user_password').isString().isLength({ max: 256 })
]