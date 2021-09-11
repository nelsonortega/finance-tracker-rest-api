import { QueryError } from 'mysql2'

export function parseError(error: QueryError) {
  switch (error.code) {
    case 'ER_DUP_ENTRY':
      return `Email is already registered`
  
    default:
      return error.code
  }
}