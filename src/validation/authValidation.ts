import { body } from 'express-validator'

export const loginValidate = [
  body('email').trim().isEmail(),
  body('user_password').isLength({ min: 6 })
]

export const changePasswordValidate = [
  body('old_password').isLength({ min: 6 }),
  body('user_password').isLength({ min: 6 })
]