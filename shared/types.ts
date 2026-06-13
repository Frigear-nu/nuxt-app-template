import type { User } from '@nuxthub/db/schema'

export type UserOpenID = Pick<User, 'id' | 'name' | 'email' | 'role' | 'avatar'>
