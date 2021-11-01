import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'

export function handleValidationError(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ 
      success: false,
      errors: errors.array() 
    })
  }

  next()
}