import type { User } from '@nuxthub/db/schema'

export type DateToString<T> = T extends Date
  ? string
  : T extends null
    ? null
    : T extends object
      ? { [K in keyof T]: DateToString<T[K]> }
      : T

// ..
export type APIUser = DateToString<Omit<User, 'password'>>
